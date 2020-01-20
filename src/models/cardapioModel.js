const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    user_id: { type: String },
    nota: { type: Number },
    comentario: { type: String }
  },
  { _id: false }
);

const cardapioSchema = new Schema({
  data: {
    type: Date
  },
  tipo: {
    type: String
  },
  entrada: {
    descricao: {
      type: String,
      required: true
    },
    avaliacao: {
      type: [Number]
    },
    comentarios: {
      type: [String]
    }
  },
  proteina: {
    descricao: {
      type: String,
      required: true
    },
    avaliacao: {
      type: [Number]
    },
    comentarios: {
      type: [String]
    }
  },
  opcao: {
    descricao: {
      type: String,
      required: true
    },
    avaliacao: {
      type: [Number]
    },
    comentarios: {
      type: [String]
    }
  },
  acompanhamento: {
    descricao: {
      type: String,
      required: true
    },
    avaliacao: {
      type: [Number]
    },
    comentarios: {
      type: [String]
    }
  },
  guarnicao: {
    descricao: {
      type: String,
      required: true
    },
    avaliacao: {
      type: [Number]
    },
    comentarios: {
      type: [String]
    }
  },
  sobremesa: {
    descricao: {
      type: String,
      required: true
    },
    avaliacao: {
      type: [Number]
    },
    comentarios: {
      type: [String]
    }
  },
  avaliacoes_geral: {
    type: [userSchema]
  },
  comentarios_geral: {
    type: [userSchema]
  }
});

module.exports = model("Cardapio", cardapioSchema);
