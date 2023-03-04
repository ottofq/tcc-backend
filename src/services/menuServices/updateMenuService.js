const menuRepository = require('../../repositories/menuRepository');
const InternalServerError = require('../../utils/errors/internalServerError');
const NotFoundError = require('../../utils/errors/notFoundError');

class UpdateMenuService {
  async handle(id, menu) {
    try {
      const menuExists = await menuRepository.findById(id);

      if (!menuExists) {
        throw Error('Menu not found');
      }
      const menuUpdated = await menuRepository.updateMenu(id, menu);


      return menuUpdated;
    } catch (error) {
      if (error.name === 'DBError') {
        throw new InternalServerError('Internal Server Error');
      }

      throw new NotFoundError(error.message);
    }
  }
}

module.exports = new UpdateMenuService();
