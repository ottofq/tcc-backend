const menuRepository = require('../../repositories/menuRepository');

const InternalServerError = require('../../utils/errors/internalServerError');

class CreateMenuService {
  async handle(menu) {
    try {
      const menuCreated = await menuRepository.create(menu);

      return menuCreated;
    } catch (error) {
      throw new InternalServerError('Internal Server Error');
    }
  }
}

module.exports = new CreateMenuService();
