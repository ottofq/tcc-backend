const infoModel = require('../models/informacaoModel');

class InfoController {
  async create(req, res) {
    const { titulo, descricao } = req.body;

    const description = descricao.replace(/(\r\n|\n|\r)/gm, '');

    try {
      const result = await infoModel.create({ titulo, descricao: description });
      return res.json(result);
    } catch (error) {
      return res.status(400).json(error);
    }
  }

  async readAll(req, res) {
    const { page } = req.query;
    const skips = 8 * (page - 1);

    try {
      const total_infos = await infoModel.countDocuments();
      const result = await infoModel
        .find()
        .skip(skips)
        .limit(8)
        .sort({ _id: -1 });
      return res.json({ total_infos, result });
    } catch (error) {
      return res.status(400).json(error);
    }
  }

  async readOne(req, res) {
    const { id } = req.params;

    try {
      const result = await infoModel.findById(id);

      return res.status(200).json(result);
    } catch (error) {
      return res.status(400).json(error);
    }
  }

  async update(req, res) {
    const { id } = req.params;
    const { titulo, descricao } = req.body;

    const description = descricao.replace(/(\r\n|\n|\r)/gm, '');

    try {
      const result = await infoModel.updateOne(
        { _id: id },
        {
          titulo,
          descricao: description,
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
