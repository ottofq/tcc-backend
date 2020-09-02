const menuRepository = require('../../repositories/menuRepository');
const createRatingCollectionService = require('../ratingServices/createRatingColletionService');
const InternalServerError = require('../../utils/errors/internalServerError');

class CreateMenuService {
  async handle(menu) {
    try {
      const menuCreated = await menuRepository.create(menu);
      await createRatingCollectionService.handle(menuCreated._id);

      return menuCreated;
    } catch (error) {
      throw new InternalServerError('Internal Server Error');
    }
  }
}

module.exports = new CreateMenuService();
