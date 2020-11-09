/* eslint-disable camelcase */
const connection = require('../database/connection');
const tmdbInstance = require('../services/axios/index');

function apiGetMovie(id) {
  const params = {
    api_key: process.env.TMDB_KEY,
  };
  return tmdbInstance.get(`/movie/${id}`, { params });
}

function recordMovieAtDatabase(movie) {
  console.log(movie);
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
          recordMovieAtDatabase(data);
          return res.status(200).send(data);
        } catch (error) {
          if (error.response) {
            const { status_message } = error.response.data;
            return res.status(error.response.status).json({ message: `${status_message}` });
          }
          return res.status(500).json({ error: 'Error on load movie' });
        }
      }
      return res.status(200).send(movie);
    } catch (error) {
      return res.status(500).json({ error: 'Error on load movie' });
    }
  },
};
