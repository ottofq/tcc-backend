const { Schema, model, Types } = require('mongoose');

const userSchema = new Schema(
  {
    user_id: { type: String },
    nota: { type: Number },
  },
  { _id: false }
);

const avaliacaoSchema = new Schema({
  cardapio: {
    type: Types.ObjectId,
    ref: 'Cardapio',
    required: true,
  },
  avaliacoes: {
    type: [userSchema],
  },
});

module.exports = model('Avaliacao', avaliacaoSchema);
