const ratingRepository = require('../../repositories/ratingRepository');

class ListCommentsMenuService {
  async handle(id, skip, limit) {
    try {
      const skipNumber = Number(skip);
      const limitNumber = Number(limit);
      const comments = await ratingRepository.listCommentsMenu(
        id,
        skipNumber,
        limitNumber
      );

      const validComments = comments[0].avaliacoes.filter(
        item => item.comentario !== undefined && item.comentario !== null
      );

      return {
        total_comentarios: comments[0].total_comentarios,
        avaliacoes: validComments,
      };
    } catch (error) {
      throw Error(error.message);
    }
  }
}

module.exports = new ListCommentsMenuService();
