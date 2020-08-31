const { celebrate, Joi, Segments } = require('celebrate');

const create = celebrate({
  [Segments.BODY]: Joi.object().keys({
    nome: Joi.string().required(),
    email: Joi.string()
      .email()
      .required(),
    password: Joi.string().required(),
  }),
});

const update = celebrate({
  [Segments.BODY]: Joi.object().keys({
    nome: Joi.string().required(),
    oldPassword: Joi.string().required(),
    newPassword: Joi.string().required(),
  }),
});

const list = celebrate({
  [Segments.QUERY]: {
    skip: Joi.number(),
    limit: Joi.number(),
  },
});

module.exports = {
  create,
  list,
  update,
};
