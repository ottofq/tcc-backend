const { celebrate, Joi, Segments } = require('celebrate');
Joi.objectId = require('joi-objectid')(Joi);

const create = celebrate({
  [Segments.BODY]: Joi.object().keys({
    tipo: Joi.string()
      .valid('Almoço', 'Jantar')
      .required(),
    entrada: Joi.string().required(),
    prato_proteico: Joi.string().required(),
    opcao: Joi.string().required(),
    acompanhamento: Joi.string().required(),
    guarnicao: Joi.string().required(),
    sobremesa: Joi.string().required(),
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
};
