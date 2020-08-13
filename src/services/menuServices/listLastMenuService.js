const menuRepository = require('../../repositories/menuRepository');

class ListLastMenuService {
  async handle() {
    try {
      const menu = await menuRepository.listLastMenu();

      return menu;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

module.exports = new ListLastMenuService();
