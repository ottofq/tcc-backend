const {
  createNewsServices,
  listNewsService,
  findNewsService,
  updateNewsService,
  deleteNewsService,
} = require('../services/newsServices');

class NewsController {
  async create(req, res) {
    const { titulo, descricao } = req.body;

    try {
      const result = await createNewsServices.handle(titulo, descricao);
      return res.status(201).json(result);
    } catch (error) {
      return res.status(error.statusCode).json({ error: error.message });
    }
  }

  async list(req, res) {
    const { page } = req.query;
    const skip = 8 * (page - 1);
    const limit = 8;

    try {
      const news = await listNewsService.handle(skip, limit);
      return res.status(200).json(news);
    } catch (error) {
      return res.status(error.statusCode).json({ error: error.message });
    }
  }

  async find(req, res) {
    const { id } = req.params;

    try {
      const news = await findNewsService.handle(id);

      return res.status(200).json(news);
    } catch (error) {
      return res.status(error.statusCode).json({ error: error.message });
    }
  }

  async update(req, res) {
    const { id } = req.params;
    const { titulo, descricao } = req.body;

    try {
      await updateNewsService.handle(id, titulo, descricao);
      return res.status(200).json({ success: 'News update success' });
    } catch (error) {
      return res.status(error.statusCode).json({ erro: error.message });
    }
  }

  async delete(req, res) {
    const { id } = req.params;

    try {
      const result = await deleteNewsService.handle(id);
      return res.status(204).json(result);
    } catch (error) {
      return res.status(error.statusCode).json({ erro: error.message });
    }
  }
}

module.exports = new NewsController();
