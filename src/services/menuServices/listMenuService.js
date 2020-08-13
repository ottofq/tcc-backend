const menuRepository = require('../../repositories/menuRepository');

class ListMenuService {
  async handle(id) {
    const menu = await menuRepository.listMenu(id);

    //  tratar o cache
    // if (exists) {
    //   console.log('cardapio no cache');
    //   return res.json(JSON.parse(exists));
    // }

    // await cache.setex(`cardapio:${id}`, 28800, JSON.stringify(result));

    return menu;
  }
}

module.exports = new ListMenuService();
