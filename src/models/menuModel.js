const { Schema, model } = require('mongoose');

const menuSchema = new Schema({
  data: {
    type: Date,
    required: true,
  },
  tipo: {
    type: String,
    required: true,
  },
  entrada: {
    type: String,
    required: true,
  },
  prato_proteico: { type: String, required: true },
  opcao: {
    type: String,
    required: true,
  },
  acompanhamento: { type: String, required: true },
  guarnicao: {
    type: String,
    required: true,
  },
  sobremesa: { type: String, required: true },
});

module.exports = model('menu', menuSchema);
