const menuRepository = require('../../repositories/menuRepository');
const { deleteRatingService } = require('../ratingServices');

class DeleteMenuService {
  async handle(menuId) {
    const result = await menuRepository.deleteMenu(menuId);
    await deleteRatingService.handle(menuId);
    // await cache.del(`cardapio:${id}`);

    return result;
  }
}

module.exports = new DeleteMenuService();
