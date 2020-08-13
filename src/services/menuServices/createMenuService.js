const menuRepository = require('../../repositories/menuRepository');
const createRatingCollectionService = require('../ratingServices/createRatingColletionService');

class CreateMenuService {
  async handle(menu) {
    try {
      const menuCreated = await menuRepository.create(menu);
      await createRatingCollectionService.handle(menuCreated._id);

      return menuCreated;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

module.exports = new CreateMenuService();
