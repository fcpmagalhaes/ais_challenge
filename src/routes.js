const express = require('express');
const { celebrate, Segments, Joi } = require('celebrate');

const UserController = require('./controllers/UserController');
const SessionController = require('./controllers/SessionController');
const MovieController = require('./controllers/MovieController');
const TranslationController = require('./controllers/TranslationController');
const login = require('./middleware/Login');
const adminVerify = require('./middleware/AdminVerify');

const routes = express.Router();

routes.get('/', (req, res) => res.send('API running 🚀'));

routes.post(
  '/user',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      login: Joi.string().required(),
      password: Joi.string().required().length(6),
    }),
  }),
  UserController.create,
);

routes.get(
  '/users',
  celebrate({
    [Segments.HEADERS]: Joi.object({
      authorization: Joi.string().required(),
    }).unknown(),
  }),
  login, adminVerify, UserController.index,
);

routes.post(
  '/session',
  SessionController.create,
);

routes.get(
  '/movie/:id',
  celebrate({
    [Segments.HEADERS]: Joi.object({
      authorization: Joi.string().required(),
    }).unknown(),
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.number().required(),
    }),
  }),
  login, MovieController.index,
);

routes.get(
  '/translation/:id',
  celebrate({
    [Segments.HEADERS]: Joi.object({
      authorization: Joi.string().required(),
    }).unknown(),
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.number().required(),
    }),
  }),
  login, TranslationController.index,
);

module.exports = routes;
