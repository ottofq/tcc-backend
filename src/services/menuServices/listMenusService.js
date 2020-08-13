const menuRepository = require('../../repositories/menuRepository');

class ListMenusService {
  async handle(skip, limit) {
    const total_menus = await menuRepository.countMenus();
    const menus = await menuRepository.list(skip, limit);

    return { total_menus, menus };
  }
}

module.exports = new ListMenusService();
