const { Schema, model, Types } = require('mongoose');

const studentSchema = new Schema(
  {
    student_id: {
      type: Types.ObjectId,
      required: true,
    },
    nome: { type: String },
    avaliacao: {
      entrada: { type: Number },
      prato_proteico: { type: Number },
      opcao: { type: Number },
      acompanhamento: { type: Number },
      guarnicao: { type: Number },
      sobremesa: { type: Number },
    },
    comentario: { type: String },
  },
  { _id: false }
);

const ratingSchema = new Schema({
  cardapio_id: {
    type: Types.ObjectId,
    ref: 'Cardapio',
    required: true,
  },
  avaliacoes: {
    type: [studentSchema],
  },
});

module.exports = model('rating', ratingSchema);
