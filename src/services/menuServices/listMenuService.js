const menuRepository = require('../../repositories/menuRepository');

class ListMenuService {
  async handle(id) {
    try {
      const menu = await menuRepository.listMenu(id);
      //  tratar o cache
      // if (exists) {
      //   console.log('cardapio no cache');
      //   return res.json(JSON.parse(exists));
      // }

      // await cache.setex(`cardapio:${id}`, 28800, JSON.stringify(result));

      return menu;
    } catch (error) {
      throw Error(error.message);
    }
  }
}

module.exports = new ListMenuService();
