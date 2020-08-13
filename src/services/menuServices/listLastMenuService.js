const menuRepository = require('../../repositories/menuRepository');

class ListMenusService {
  async handle() {
    const menu = await menuRepository.listLastMenu();

    return menu;
  }
}

module.exports = new ListMenusService();
