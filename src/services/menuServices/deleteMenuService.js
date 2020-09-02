const menuRepository = require('../../repositories/menuRepository');
const { deleteRatingCollectionService } = require('../ratingServices');
const InternalServerError = require('../../utils/errors/internalServerError');
const NotFoundError = require('../../utils/errors/notFoundError');

class DeleteMenuService {
  async handle(menuId) {
    try {
      const menuExists = await menuRepository.findById(menuId);

      if (!menuExists) {
        throw Error('Menu not found');
      }

      const result = await menuRepository.deleteMenu(menuId);
      await deleteRatingCollectionService.handle(menuId);
      // await cache.del(`cardapio:${id}`);

      return result;
    } catch (error) {
      if (error.name === 'DBError') {
        throw new InternalServerError('Internal Server Error');
      }

      throw new NotFoundError(error.message);
    }
  }
}

module.exports = new DeleteMenuService();
