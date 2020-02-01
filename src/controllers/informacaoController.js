const infoModel = require('../models/informacaoModel');

class InfoController {
  async create(req, res) {
    const { descricao } = req.body;

    try {
      const result = await infoModel.create({ descricao });
      return res.json(result);
    } catch (error) {
      return res.status(400).json(error);
    }
  }

  async read(req, res) {
    try {
      const result = await infoModel
        .find()
        .sort({ _id: -1 })
        .limit(10);
      return res.json(result);
    } catch (error) {
      return res.status(400).json(error);
    }
  }

  async update(req, res) {
    const { id } = req.params;
    const { descricao } = req.body;

    try {
      const result = await infoModel.updateOne(
        { _id: id },
        {
          descricao,
        }
      );
      return res.json(result);
    } catch (error) {
      return res.status(400).json(error);
    }
  }

  async delete(req, res) {
    const { id } = req.params;

    try {
      const result = await infoModel.deleteOne({ _id: id });
      return res.json(result);
    } catch (error) {
      return res.status(400).json(error);
    }
  }
}

module.exports = new InfoController();
