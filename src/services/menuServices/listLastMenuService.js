const menuRepository = require('../../repositories/menuRepository');
const InternalServerError = require('../../utils/errors/internalServerError');
const cache = require('../../repositories/cacheRepository');

class ListLastMenuService {
  async handle() {
    try {
      const menuCache = await cache.get('lastMenu');

      if (!menuCache) {
        const menuDB = await menuRepository.listLastMenu();
        await cache.save('lastMenu', 28800, JSON.stringify(menuDB));
        return menuDB;
      }

      return JSON.parse(menuCache);
    } catch (error) {
      throw new InternalServerError('Internal Server Error');
    }
  }
}

module.exports = new ListLastMenuService();
