const express = require('express');
// const { celebrate, Segments, Joi } = require('celebrate');

const routes = express.Router();

routes.get('/', (req, res) => res.send('API running 🚀'));

module.exports = routes;
