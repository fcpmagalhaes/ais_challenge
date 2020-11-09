/* eslint-disable camelcase */
const connection = require('../database/connection');
const tmdbInstance = require('../services/axios/index');

function apiGetMovie(id) {
  const params = {
    api_key: process.env.TMDB_KEY,
  };
  return tmdbInstance.get(`/movie/${id}`, { params });
}

async function recordCollectionInDb(belongs_to_collection, id) {
  const {
    id: idCollection,
    name: nameCollection,
    poster_path: posterCollection,
    backdrop_path: backdropCollection,
  } = belongs_to_collection;
  try {
    const collection = await connection('collections')
      .where('id', idCollection)
      .select('*')
      .first();
    if (!collection) {
      await connection('collections').insert({
        id: idCollection,
        name: nameCollection,
        poster_path: posterCollection,
        backdrop_path: backdropCollection,
      });
    }
    await connection('movies').where('id', id).update({
      belongs_to_collection: idCollection,
    });
  } catch (error) {
    console.log('Error saving the movie collection in database', error);
  }
}

async function recordGenresInDb(genres, id) {
  genres.forEach(async (genre) => {
    try {
      const { id: idGenre, name } = genre;
      const response = await connection('genres')
        .where('id', idGenre)
        .select('*')
        .first();
      if (!response) {
        await connection('genres').insert({
          id: idGenre,
          name,
        });
      }
      await connection('movie_genres').insert({
        id_genre: idGenre,
        id_movie: id,
      });
    } catch (error) {
      console.log('Error saving the movie genres in database', error);
    }
  });
}

async function recordProductionCompaniesInDb(production_companies, idMovie) {
  production_companies.forEach(async (company) => {
    try {
      const {
        id: idCompany, name, logo_path, origin_country,
      } = company;
      const response = await connection('production_companies')
        .where('id', idCompany)
        .select('*')
        .first();
      if (!response) {
        await connection('production_companies').insert({
          id: idCompany,
          logo_path,
          name,
          origin_country,
        });
      }
      await connection('movie_production_companies').insert({
        id_production_company: idCompany,
        id_movie: idMovie,
      });
    } catch (error) {
      console.log('Error saving the movie production companies in database', error);
    }
  });
}

async function recordProductionCountriesInDb(production_countries, idMovie) {
  production_countries.forEach(async (country) => {
    try {
      const { name, iso_3166_1 } = country;
      let idCountry;
      const response = await connection('production_countries')
        .where('name', name)
        .select('*')
        .first();
      if (!response) {
        await connection('production_countries').insert({
          iso_3166_1,
          name,
        });
        const { id } = await connection('production_countries')
          .where('name', name)
          .select('id')
          .first();
        idCountry = id;
      } else {
        idCountry = response.id;
      }
      await connection('movie_production_countries').insert({
        id_production_country: idCountry,
        id_movie: idMovie,
      });
    } catch (error) {
      console.log('Error saving the movie production countries in database', error);
    }
  });
}

async function recordSpokenLanguagesInDb(spoken_languages, idMovie) {
  spoken_languages.forEach(async (language) => {
    try {
      const { name, iso_639_1 } = language;
      let idLanguage;
      const response = await connection('spoken_languages')
        .where('name', name)
        .select('*')
        .first();
      if (!response) {
        await await connection('spoken_languages').insert({
          iso_639_1,
          name,
        });
        const { id } = await connection('spoken_languages')
          .where('name', name)
          .select('id')
          .first();
        idLanguage = id;
      } else {
        idLanguage = response.id;
      }

      await connection('movie_spoken_languages').insert({
        id_spoken_language: idLanguage,
        id_movie: idMovie,
      });
    } catch (error) {
      console.log('Error saving the movie spoken languages in database', error);
    }
  });
}

async function recordMovieInDb(movie) {
  const {
    adult,
    backdrop_path,
    budget,
    homepage,
    id,
    imdb_id,
    original_language,
    original_title,
    overview,
    popularity,
    poster_path,
    release_date,
    revenue,
    runtime,
    status,
    tagline,
    title,
    video,
    vote_average,
    vote_count,
    belongs_to_collection,
    genres,
    production_companies,
    production_countries,
    spoken_languages,
  } = movie;

  try {
    await connection('movies').insert({
      adult,
      backdrop_path,
      budget,
      homepage,
      id,
      imdb_id,
      original_language,
      original_title,
      overview,
      popularity,
      poster_path,
      release_date,
      revenue,
      runtime,
      status,
      tagline,
      title,
      video,
      vote_average,
      vote_count,
    });

    if (belongs_to_collection) {
      recordCollectionInDb(belongs_to_collection, id);
    }
    if (genres.length !== 0) {
      recordGenresInDb(genres, id);
    }
    if (production_companies.length !== 0) {
      recordProductionCompaniesInDb(production_companies, id);
    }
    if (production_countries.length !== 0) {
      recordProductionCountriesInDb(production_countries, id);
    }
    if (spoken_languages.length !== 0) {
      recordSpokenLanguagesInDb(spoken_languages, id);
    }
  } catch (error) {
    console.log('Erro saving movie at database', error);
  }
}
module.exports = {
  async index(req, res) {
    const { id } = req.params;
    try {
      const movie = await connection('movies')
        .where('id', id)
        .select('*')
        .first();

      if (!movie) {
        try {
          const { data } = await apiGetMovie(id);
          recordMovieInDb(data);
          return res.status(200).send(data);
        } catch (error) {
          if (error.response) {
            const { status_message } = error.response.data;
            return res.status(error.response.status).json({ message: `${status_message}` });
          }
          return res.status(500).json({ error: 'Error loading movie' });
        }
      }

      if (movie.belongs_to_collection) {
        const belongs_to_collection = await connection('collections')
          .where('id', movie.belongs_to_collection)
          .select('*');
        movie.belongs_to_collection = belongs_to_collection;
      }

      const genres = await connection('movie_genres')
        .where('id_movie', movie.id)
        .innerJoin('genres', 'genres.id', 'movie_genres.id_genre')
        .select('genres.id', 'genres.name');

      const production_companies = await connection('movie_production_companies')
        .where('id_movie', movie.id)
        .innerJoin('production_companies', 'production_companies.id', 'movie_production_companies.id_production_company')
        .select('production_companies.*');

      const production_countries = await connection('movie_production_countries')
        .where('id_movie', movie.id)
        .innerJoin('production_countries', 'production_countries.id', 'movie_production_countries.id_production_country')
        .select('production_countries.*');

      const spoken_languages = await connection('movie_spoken_languages')
        .where('id_movie', movie.id)
        .innerJoin('spoken_languages', 'spoken_languages.id', 'movie_spoken_languages.id_spoken_language')
        .select('spoken_languages.*');

      movie.genres = genres;
      movie.production_companies = production_companies;
      movie.production_countries = production_countries;
      movie.spoken_languages = spoken_languages;
      return res.status(200).send(movie);
    } catch (error) {
      return res.status(500).json({ error: 'Error loading movie' });
    }
  },
};
