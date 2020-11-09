/* eslint-disable camelcase */
const connection = require('../database/connection');
const tmdbInstance = require('../services/axios/index');

function apiGetTranslation(id) {
  const params = {
    api_key: process.env.TMDB_KEY,
  };
  return tmdbInstance.get(`/movie/${id}/translations`, { params });
}
module.exports = {
  async index(req, res) {
    const { id } = req.params;
    try {
      const translation = await connection('translations')
        .where('id_movie', id)
        .select('*')
        .first();

      if (!translation) {
        try {
          const { data } = await apiGetTranslation(id);
          // recordMovieInDb(data);
          return res.status(200).send(data);
        } catch (error) {
          if (error.response) {
            const { status_message } = error.response.data;
            return res.status(error.response.status).json({ message: `${status_message}` });
          }
          return res.status(500).json({ error: 'Error loading movie' });
        }
      }

      // if (movie.belongs_to_collection) {
      //   const belongs_to_collection = await connection('collections')
      //     .where('id', movie.belongs_to_collection)
      //     .select('*');
      //   movie.belongs_to_collection = belongs_to_collection;
      // }

      // const genres = await connection('movie_genres')
      //   .where('id_movie', movie.id)
      //   .innerJoin('genres', 'genres.id', 'movie_genres.id_genre')
      //   .select('genres.id', 'genres.name');

      // const production_companies = await connection('movie_production_companies')
      //   .where('id_movie', movie.id)
      //   .innerJoin('production_companies', 'production_companies.id', 'movie_production_companies.id_production_company')
      //   .select('production_companies.*');

      // const production_countries = await connection('movie_production_countries')
      //   .where('id_movie', movie.id)
      //   .innerJoin('production_countries', 'production_countries.id', 'movie_production_countries.id_production_country')
      //   .select('production_countries.*');

      // const spoken_languages = await connection('movie_spoken_languages')
      //   .where('id_movie', movie.id)
      //   .innerJoin('spoken_languages', 'spoken_languages.id', 'movie_spoken_languages.id_spoken_language')
      //   .select('spoken_languages.*');

      // movie.genres = genres;
      // movie.production_companies = production_companies;
      // movie.production_countries = production_countries;
      // movie.spoken_languages = spoken_languages;
      return res.status(200).send(translation);
    } catch (error) {
      return res.status(500).json({ error: 'Error loading translation' });
    }
  },
};
