const menuRepository = require('../../repositories/menuRepository');

class ListMenusService {
  async handle(skip, limit) {
    try {
      const total_menus = await menuRepository.countMenus();
      const menus = await menuRepository.list(skip, limit);

      return { total_menus, menus };
    } catch (error) {
      throw Error(error.message);
    }
  }
}

module.exports = new ListMenusService();
