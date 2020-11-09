/* eslint-disable camelcase */
const connection = require('../database/connection');
const tmdbInstance = require('../services/axios/index');

function apiGetTranslation(id) {
  const params = {
    api_key: process.env.TMDB_KEY,
  };
  return tmdbInstance.get(`/movie/${id}/translations`, { params });
}

async function recordTranslationInDb(translations) {
  const { id, translations: translationsData } = translations;

  translationsData.forEach(async (translation) => {
    try {
      const {
        iso_3166_1,
        iso_639_1,
        name,
        english_name,
        data,
      } = translation;

      const {
        homepage,
        overview,
        runtime,
        tagline,
        title,
      } = data;

      const movie = await connection('movies')
        .where('id', id)
        .select('*')
        .first();

      if (movie) {
        await connection('translations').insert({
          iso_3166_1,
          iso_639_1,
          name,
          english_name,
          homepage,
          overview,
          runtime,
          tagline,
          title,
          id_movie: id,
        });
      } else {
        // To do: refact to prevent violates foreign key constraint error
        console.log('Necessary exist id in table movie before save translations.');
      }
    } catch (error) {
      console.log('Error saving translations in database', error);
    }
  });
}

module.exports = {
  async index(req, res) {
    const { id } = req.params;
    try {
      const idMovie = await connection('translations')
        .where('id_movie', id)
        .select('id_movie')
        .first();

      if (!idMovie) {
        try {
          const { data } = await apiGetTranslation(id);
          recordTranslationInDb(data);
          return res.status(200).send(data);
        } catch (error) {
          if (error.response) {
            const { status_message } = error.response.data;
            return res.status(error.response.status).json({ message: `${status_message}` });
          }
          return res.status(500).json({ error: 'Error loading translations' });
        }
      }

      const translations = await connection('translations')
        .where('id_movie', id)
        .select(
          'iso_3166_1',
          'iso_639_1',
          'name',
          'english_name',
          'homepage',
          'overview',
          'runtime',
          'tagline',
          'title',
        );
      return res.status(200).send({ id, translations });
    } catch (error) {
      return res.status(500).json({ error: 'Error loading translation' });
    }
  },
};
