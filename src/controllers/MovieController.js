// const axios = require('axios');
const connection = require('../database/connection');
const tmdbInstance = require('../services/axios/index');

function apiGetMovie(id) {
  return tmdbInstance.get(`/movie/${id}?api_key=${process.env.TMDB_KEY}`);
}

module.exports = {

  async index(req, res) {
    const { id } = req.params;
    try {
      const movie = await apiGetMovie(id);

      // const movie = await connection('movies')
      //   .where('id', id)
      //   .select('*')
      //   .first();

      // if (!movie) {
      //   try {
      //     console.log('vai procurar axios', process.env.TMDB_API);
      //     console.log('vai procurar axios', process.env.NODE_ENV);
      //   } catch (error) {
      //     console.log('erro ao procurar axios', error);
      //   }
      // }

      return res.status(200).send(movie.data);
    } catch (error) {
      return res.status(500).json({ error: 'Error on load movie' });
    }
  },
};
