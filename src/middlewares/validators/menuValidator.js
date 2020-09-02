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

const update = celebrate({
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

const listAllMenus = celebrate({
  [Segments.QUERY]: {
    page: Joi.number(),
  },
});

const listComments = celebrate({
  [Segments.QUERY]: {
    skip: Joi.number(),
    limit: Joi.number(),
  },
});

const createRating = celebrate({
  [Segments.BODY]: Joi.object().keys({
    student_id: Joi.objectId().error(() => {
      return Error('Invalid objectID');
    }),
    avaliacao: Joi.object().keys({
      entrada: Joi.number()
        .valid(1, 2, 3, 4, 5)
        .required(),
      prato_proteico: Joi.number()
        .valid(1, 2, 3, 4, 5)
        .required(),
      opcao: Joi.number()
        .valid(1, 2, 3, 4, 5)
        .required(),
      acompanhamento: Joi.number()
        .valid(1, 2, 3, 4, 5)
        .required(),
      guarnicao: Joi.number()
        .valid(1, 2, 3, 4, 5)
        .required(),
      sobremesa: Joi.number()
        .valid(1, 2, 3, 4, 5)
        .required(),
    }),
    comentario: Joi.string(),
  }),
});

module.exports = {
  create,
  update,
  createRating,
  listAllMenus,
  listComments,
};
