const { Schema, model } = require('mongoose');

const cardapioSchema = new Schema({
  data: {
    type: Date,
    required: true,
  },
  tipo: {
    type: String,
    required: true,
  },
  entrada: {
    descricao: {
      type: String,
      required: true,
    },
    avaliacao: {
      type: [Number],
    },
    comentarios: {
      type: [String],
    },
  },
  proteina: {
    descricao: {
      type: String,
      required: true,
    },
    avaliacao: {
      type: [Number],
    },
    comentarios: {
      type: [String],
    },
  },
  opcao: {
    descricao: {
      type: String,
      required: true,
    },
    avaliacao: {
      type: [Number],
    },
    comentarios: {
      type: [String],
    },
  },
  acompanhamento: {
    descricao: {
      type: String,
      required: true,
    },
    avaliacao: {
      type: [Number],
    },
    comentarios: {
      type: [String],
    },
  },
  guarnicao: {
    descricao: {
      type: String,
      required: true,
    },
    avaliacao: {
      type: [Number],
    },
    comentarios: {
      type: [String],
    },
  },
  sobremesa: {
    descricao: {
      type: String,
      required: true,
    },
    avaliacao: {
      type: [Number],
    },
    comentarios: {
      type: [String],
    },
  },
  media_geral: {
    type: Number,
    default: 0,
  },
});

module.exports = model('Cardapio', cardapioSchema);
