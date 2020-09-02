const menuRepository = require('../../repositories/menuRepository');
const InternalServerError = require('../../utils/errors/internalServerError');

class ListMenusService {
  async handle(skip, limit) {
    try {
      const total_menus = await menuRepository.countMenus();
      const menus = await menuRepository.list(skip, limit);

      return { total_menus, menus };
    } catch (error) {
      throw new InternalServerError('Internal Server Error');
    }
  }
}

module.exports = new ListMenusService();
