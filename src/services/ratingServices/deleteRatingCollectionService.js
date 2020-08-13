const ratingRepository = require('../../repositories/ratingRepository');

class DeleteRatingCollectionService {
  async handle(menuId) {
    const result = await ratingRepository.delete(menuId);
    return result;
  }
}

module.exports = new DeleteRatingCollectionService();
