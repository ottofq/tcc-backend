const { Schema, model, Types } = require('mongoose');

const userSchema = new Schema(
  {
    user_id: { type: String },
    comentario: { type: String },
  },
  { _id: false }
);

const comentarioSchema = new Schema({
  cardapio: {
    type: Types.ObjectId,
    ref: 'Cardapio',
    required: true,
  },
  comentarios: {
    type: [userSchema],
  },
});

module.exports = model('Comentario', comentarioSchema);
