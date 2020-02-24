const { model, Schema } = require('mongoose');

const infoSchema = new Schema({
  data: {
    type: Date,
    default: Date.now,
  },
  titulo: {
    type: String,
    required: true,
  },
  descricao: {
    type: String,
    required: true,
  },
});

module.exports = model('Informacoes', infoSchema);
