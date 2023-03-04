const menuRepository = require('../../repositories/menuRepository');
const { deleteRatingCollectionService } = require('../ratingServices');
const NotFoundError = require('../../utils/errors/notFoundError');

class DeleteMenuService {
  async handle(menuId) {
    const menuExists = await menuRepository.findById(menuId);

    if (!menuExists) {
      throw NotFoundError('Menu not found');
    }

    const result = await menuRepository.deleteMenu(menuId);
    await deleteRatingCollectionService.handle(menuId);

    return result;
  }
}

module.exports = new DeleteMenuService();
