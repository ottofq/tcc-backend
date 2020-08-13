const menuRepository = require('../../repositories/menuRepository');

class UpdateMenuService {
  async handle(id, menu) {
    try {
      const menuUpdated = await menuRepository.updateMenu(id, menu);

      // await cache.del(`cardapio:${id}`);

      return menuUpdated;
    } catch (error) {
      throw Error(error.message);
    }
  }
}

module.exports = new UpdateMenuService();
