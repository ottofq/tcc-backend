const menuRepository = require('../../repositories/menuRepository');

class UpdateMenuService {
  async handle(id, menu) {
    const menuUpdated = await menuRepository.updateMenu(id, menu);

    // await cache.del(`cardapio:${id}`);

    return menuUpdated;
  }
}

module.exports = new UpdateMenuService();
