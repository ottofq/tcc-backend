const menuModel = require('../models/menuModel');
const DBError = require('../utils/errors/dbError');

class MenuRepository {
  async create(menu) {
    try {
      const menuCreated = await menuModel.create(menu);

      return menuCreated;
    } catch (error) {
      throw new DBError(error.message);
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
      throw new DBError(error.message);
    }
  }

  async findById(id) {
    try {
      const menus = await menuModel.findById(id);

      return menus;
    } catch (error) {
      throw new DBError(error.message);
    }
  }

  async countMenus() {
    try {
      const totalMenus = await menuModel.countDocuments();
      return totalMenus;
    } catch (error) {
      throw new DBError(error.message);
    }
  }

  async listLastMenu() {
    try {
      const menu = await menuModel.findOne().sort({ _id: -1 });
      return menu;
    } catch (error) {
      throw new DBError(error.message);
    }
  }

  async listMenu(id) {
    try {
      const menu = await menuModel.findOne({ _id: id });
      return menu;
    } catch (error) {
      throw new DBError(error.message);
    }
  }

  async deleteMenu(id) {
    try {
      const result = await menuModel.deleteOne({ _id: id });
      return result;
    } catch (error) {
      throw new DBError(error.message);
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
      throw new DBError(error.message);
    }
  }
}

module.exports = new MenuRepository();
