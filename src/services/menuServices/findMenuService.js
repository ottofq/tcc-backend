const menuRepository = require('../../repositories/menuRepository');
const InternalServerError = require('../../utils/errors/internalServerError');
const NotFoundError = require('../../utils/errors/notFoundError');

class FindMenuService {
  async handle(id) {
    try {
      const menu = await menuRepository.findById(id);

      if (!menu) {
        throw Error('Menu not found');
      }

      return menu;
    } catch (error) {
      if (error.name === 'DBError') {
        throw new InternalServerError('Internal Server Error');
      }
      throw new NotFoundError(error.message);
    }
  }
}

module.exports = new FindMenuService();
