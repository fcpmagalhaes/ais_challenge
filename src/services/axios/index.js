const axios = require('axios');

const tmdbInstance = axios.create({
  baseURL: process.env.TMDB_API,
});
module.exports = tmdbInstance;
