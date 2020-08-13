const menuModel = require('../models/menuModel');
const ratingModel = require('../models/ratingModel');

class MenuRepository {
  async create(menu) {
    try {
      const menuCreated = await menuModel.create(menu);
      const menuId = menuCreated._id;
      await ratingModel.create({ cardapio: menuId });

      return menuCreated;
    } catch (error) {
      throw Error('Error on create a new menu');
    }
  }

  async list(skip, limit) {
    try {
      const menus = await menuModel
        .find()
        .skip(skip)
        .limit(limit)
        .sort({ _id: -1 });

      return menus;
    } catch (error) {
      throw Error('Error when listing menus');
    }
  }

  async countMenus() {
    try {
      const totalMenus = await menuModel.countDocuments();
      return totalMenus;
    } catch (error) {
      throw Error('Error when count menus');
    }
  }

  async listLastMenu() {
    try {
      const menu = await menuModel.findOne().sort({ _id: -1 });
      return menu;
    } catch (error) {
      throw Error('Error when list last menu saved');
    }
  }

  async listMenu(id) {
    try {
      const menu = await menuModel.findOne({ _id: id });
      return menu;
    } catch (error) {
      throw Error('Menu not found in database');
    }
  }

  async deleteMenu(id) {
    try {
      const result = await menuModel.deleteOne({ _id: id });
      return result;
    } catch (error) {
      throw Error('Error when delete menu');
    }
  }

  async updateMenu(id, menu) {
    try {
      const menuUpdated = await menuModel.updateOne(
        { _id: id },
        {
          $set: {
            tipo: menu.tipo,
            entrada: menu.entrada,
            prato_proteico: menu.prato_proteico,
            opcao: menu.opcao,
            acompanhamento: menu.acompanhamento,
            guarnicao: menu.guarnicao,
            sobremesa: menu.sobremesa,
          },
        }
      );
      return menuUpdated;
    } catch (error) {
      throw Error('Error when update menu');
    }
  }
}

module.exports = new MenuRepository();
