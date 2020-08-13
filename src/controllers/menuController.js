const {
  createMenuService,
  deleteMenuService,
  updateMenuService,
  listMenusService,
  listLastMenuService,
  listMenuService,
} = require('../services/menuServices');

class MenuController {
  async create(req, res) {
    const data = Date.now();
    const {
      tipo,
      entrada,
      prato_proteico,
      opcao,
      acompanhamento,
      guarnicao,
      sobremesa,
    } = req.body;

    const menu = {
      data,
      tipo,
      entrada,
      prato_proteico,
      opcao,
      acompanhamento,
      guarnicao,
      sobremesa,
    };

    try {
      const menuCreated = await createMenuService.handle(menu);
      return res.status(200).json(menuCreated);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  async readLast(req, res) {
    try {
      const menu = await listLastMenuService.handle();
      return res.status(200).json(menu);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  async readAll(req, res) {
    try {
      const { page } = req.query;
      const skip = 8 * (page - 1);
      const limit = 8;
      const { total_menus, menus } = await listMenusService.handle(skip, limit);

      return res.status(200).json({ total_menus, menus });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  async readOne(req, res) {
    const { id } = req.params;

    try {
      const menu = await listMenuService.handle(id);
      return res.status(200).json(menu);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  async delete(req, res) {
    const { id } = req.params;

    try {
      const result = await deleteMenuService.handle(id);
      return res.status(200).json(result);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  async update(req, res) {
    const { id } = req.params;
    const {
      tipo,
      entrada,
      prato_proteico,
      opcao,
      acompanhamento,
      guarnicao,
      sobremesa,
    } = req.body;

    try {
      const menuUpdated = await updateMenuService.handle(id, {
        tipo,
        entrada,
        prato_proteico,
        opcao,
        acompanhamento,
        guarnicao,
        sobremesa,
      });
      return res.status(200).json(menuUpdated);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}
module.exports = new MenuController();
