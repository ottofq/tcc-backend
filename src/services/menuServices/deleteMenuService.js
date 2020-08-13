const menuRepository = require('../../repositories/menuRepository');
const { deleteRatingCollectionService } = require('../ratingServices');

class DeleteMenuService {
  async handle(menuId) {
    try {
      const result = await menuRepository.deleteMenu(menuId);
      await deleteRatingCollectionService.handle(menuId);
      // await cache.del(`cardapio:${id}`);

      return result;
    } catch (error) {
      throw Error(error.message);
    }
  }
}

module.exports = new DeleteMenuService();
