const { celebrate, Joi, Segments } = require('celebrate');
Joi.objectId = require('joi-objectid')(Joi);

module.exports = celebrate({
  [Segments.PARAMS]: {
    id: Joi.objectId().error(() => {
      return Error('Invalid objectID');
    }),
  },
});
