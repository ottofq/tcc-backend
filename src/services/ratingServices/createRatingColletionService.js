const ratingRepository = require('../../repositories/ratingRepository');

class CreateRatingCollectionService {
  async handle(menuId) {
    const result = await ratingRepository.createRatingCollection(menuId);
    return result;
  }
}

module.exports = new CreateRatingCollectionService();
