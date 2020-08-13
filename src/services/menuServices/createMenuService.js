const menuRepository = require('../../repositories/menuRepository');

class CreateMenuService {
  async handle(menu) {
    const menuCreated = await menuRepository.create(menu);

    return menuCreated;
  }
}

module.exports = new CreateMenuService();
