const ratingRepository = require('../../repositories/ratingRepository');

class AverageMenuRatingService {
  async handle(menuId) {
    try {
      const average = await ratingRepository.menuAverage(menuId);
      return average[0];
    } catch (error) {
      throw Error(error.message);
    }
  }
}

module.exports = new AverageMenuRatingService();
