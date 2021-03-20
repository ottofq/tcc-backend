const menuRepository = require('../../repositories/menuRepository');
const { deleteRatingCollectionService } = require('../ratingServices');
const cache = require('../../repositories/cacheRepository');
const NotFoundError = require('../../utils/errors/notFoundError');

class DeleteMenuService {
  async handle(menuId) {
    const menuExists = await menuRepository.findById(menuId);

    if (!menuExists) {
      throw NotFoundError('Menu not found');
    }

    const result = await menuRepository.deleteMenu(menuId);
    await deleteRatingCollectionService.handle(menuId);
    const menuCached = await cache.get('lastMenu');
    const menuCacheHandled = JSON.parse(menuCached);

    if (menuCacheHandled._id === menuId) {
      await cache.delete('lastMenu');
    }

    return result;
  }
}

module.exports = new DeleteMenuService();
