const menuRepository = require('../../repositories/menuRepository');
const InternalServerError = require('../../utils/errors/internalServerError');
const cache = require('../../repositories/cacheRepository');

class CreateMenuService {
  async handle(menu) {
    try {
      const menuCreated = await menuRepository.create(menu);
      await cache.save('lastMenu', 28800, JSON.stringify(menuCreated));

      return menuCreated;
    } catch (error) {
      throw new InternalServerError('Internal Server Error');
    }
  }
}

module.exports = new CreateMenuService();
