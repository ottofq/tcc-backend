const ratingRepository = require('../../repositories/ratingRepository');
const menuRepository = require('../../repositories/menuRepository');
const NotFoundError = require('../../utils/errors/notFoundError');
const InternalServerError = require('../../utils/errors/internalServerError');

class AverageMenuRatingService {
  async handle(menuId) {
    try {
      const menuExists = await menuRepository.findById(menuId);

      if (!menuExists) {
        throw Error('Menu not found');
      }

      const average = await ratingRepository.menuAverage(menuId);
      return average[0];
    } catch (error) {
      if (error.name === 'DBError') {
        throw new InternalServerError('Internal Server Error');
      }
      throw new NotFoundError(error.message);
    }
  }
}

module.exports = new AverageMenuRatingService();
