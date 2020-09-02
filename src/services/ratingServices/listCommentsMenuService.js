const ratingRepository = require('../../repositories/ratingRepository');
const menuRepository = require('../../repositories/menuRepository');
const NotFoundError = require('../../utils/errors/notFoundError');
const InternalServerError = require('../../utils/errors/internalServerError');

class ListCommentsMenuService {
  async handle(id, skip, limit) {
    try {
      const skipNumber = Number(skip);
      const limitNumber = Number(limit);

      const menuExists = await menuRepository.findById(id);

      if (!menuExists) {
        throw Error('Menu not found');
      }

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
      if (error.name === 'DBError') {
        throw new InternalServerError('Internal Server Error');
      }
      throw new NotFoundError(error.message);
    }
  }
}

module.exports = new ListCommentsMenuService();
