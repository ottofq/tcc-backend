const menuRepository = require('../../repositories/menuRepository');
const InternalServerError = require('../../utils/errors/internalServerError');

class ListLastMenuService {
  async handle() {
    try {
      const menuDB = await menuRepository.listLastMenu();

      return menuDB;
    } catch (error) {
      throw new InternalServerError('Internal Server Error');
    }
  }
}

module.exports = new ListLastMenuService();
