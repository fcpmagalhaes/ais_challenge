const express = require('express');
const { celebrate, Segments, Joi } = require('celebrate');

const UserController = require('./controllers/UserController');
const SessionController = require('./controllers/SessionController');
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

module.exports = routes;
