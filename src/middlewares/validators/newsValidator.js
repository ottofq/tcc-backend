const { celebrate, Joi, Segments } = require('celebrate');

const create = celebrate({
  [Segments.BODY]: Joi.object().keys({
    titulo: Joi.string().required(),
    descricao: Joi.string().required(),
  }),
});

const update = celebrate({
  [Segments.BODY]: Joi.object().keys({
    titulo: Joi.string().required(),
    descricao: Joi.string().required(),
  }),
});

const list = celebrate({
  [Segments.QUERY]: {
    page: Joi.number(),
  },
});

module.exports = {
  create,
  list,
  update,
};
