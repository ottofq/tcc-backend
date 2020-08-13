const { ObjectId } = require('mongoose').Types;
const ratingModel = require('../models/ratingModel');

class RatingRepository {
  async create(menuId, student, rating, comments) {
    try {
      const result = await ratingModel.updateOne(
        { cardapio_id: menuId },
        {
          $push: {
            avaliacoes: {
              $each: [
                {
                  student_id: student._id,
                  avaliacao: rating,
                  comentario: comments,
                  nome: student.nome,
                },
              ],
              $position: 0,
            },
          },
        }
      );

      return result;
    } catch (error) {
      throw Error(error.message);
    }
  }

  async createRatingCollection(menuId) {
    try {
      const ratingCollection = await ratingModel.create({
        cardapio_id: menuId,
      });

      return ratingCollection;
    } catch (error) {
      throw Error(error.message);
    }
  }

  async findStudentRating(menuId, studentId) {
    try {
      const studentRate = await ratingModel.findOne({
        cardapio_id: menuId,
        avaliacoes: { $elemMatch: { student_id: studentId } },
      });

      return studentRate;
    } catch (error) {
      throw Error(error.message);
    }
  }

  async updateRating(menuId, student, rating, comments) {
    try {
      const result = await ratingModel.updateOne(
        { cardapio_id: menuId, 'avaliacoes.student_id': student._id },
        {
          $set: {
            'avaliacoes.$.avaliacao': rating,
            'avaliacoes.$.comentario': comments,
          },
        }
      );

      return result;
    } catch (error) {
      throw Error(error.message);
    }
  }

  async menuAverage(id) {
    try {
      const average = await ratingModel.aggregate([
        { $match: { cardapio_id: ObjectId(id) } },
        {
          $project: {
            total_avaliacoes: { $size: '$avaliacoes' },
            avaliacao: {
              entrada: { $avg: '$avaliacoes.avaliacao.entrada' },
              prato_proteico: { $avg: '$avaliacoes.avaliacao.prato_proteico' },
              opcao: { $avg: '$avaliacoes.avaliacao.opcao' },
              acompanhamento: { $avg: '$avaliacoes.avaliacao.acompanhamento' },
              guarnicao: { $avg: '$avaliacoes.avaliacao.guarnicao' },
              sobremesa: { $avg: '$avaliacoes.avaliacao.sobremesa' },
            },
          },
        },
      ]);

      return average;
    } catch (error) {
      throw Error(error.message);
    }
  }

  async listCommentsMenu(id, skip, limit) {
    try {
      const comments = await ratingModel.aggregate([
        { $match: { cardapio_id: ObjectId(id) } },
        {
          $project: {
            total_comentarios: { $size: '$avaliacoes.comentario' },
            avaliacoes: {
              $slice: ['$avaliacoes', skip, limit],
            },
          },
        },
      ]);
      return comments;
    } catch (error) {
      throw Error(error.message);
    }
  }

  async delete(menuId) {
    try {
      const result = await ratingModel.deleteOne({ cardapio_id: menuId });
      return result;
    } catch (error) {
      throw Error(error.message);
    }
  }
}

module.exports = new RatingRepository();
