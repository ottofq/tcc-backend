const cardapioModel = require('../models/cardapioModel');
const comentarioModel = require('../models/comentarioModel');
const avaliacaoModel = require('../models/avaliacaoModel');
const cache = require('../redis');

class CardapioController {
  async create(req, res) {
    const data = Date.now();
    const {
      tipo,
      entrada,
      proteina,
      opcao,
      acompanhamento,
      guarnicao,
      sobremesa,
    } = req.body;

    const cardapio = {
      data,
      tipo,
      entrada: {
        descricao: entrada,
      },
      proteina: {
        descricao: proteina,
      },
      opcao: {
        descricao: opcao,
      },
      acompanhamento: {
        descricao: acompanhamento,
      },
      guarnicao: {
        descricao: guarnicao,
      },
      sobremesa: {
        descricao: sobremesa,
      },
    };

    const result = await cardapioModel.create(cardapio);
    // eslint-disable-next-line no-underscore-dangle
    const id = result._id;
    comentarioModel.create({ cardapio: id });
    avaliacaoModel.create({ cardapio: id });

    return res.json(result);
  }

  async readLast(req, res) {
    const result = await cardapioModel.findOne().sort({ _id: -1 });

    return res.json(result);
  }

  async readAll(req, res) {
    const { page } = req.query;
    const skips = 10 * (page - 1);
    const result = await cardapioModel
      .find()
      .skip(skips)
      .limit(10);

    return res.json(result);
  }

  async readOne(req, res) {
    const { id } = req.params;

    const exists = await cache.get(`cardapio:${id}`);

    if (exists) {
      console.log('cardapio no cache');
      return res.json(JSON.parse(exists));
    }

    try {
      const result = await cardapioModel.findOne({ _id: id });

      await cache.setex(`cardapio:${id}`, 28800, JSON.stringify(result));

      return res.json(result);
    } catch (error) {
      return res.status(400).json(error);
    }
  }

  async rate(req, res) {
    const { nota } = req.body;
    const { id } = req.params;
    const { user_id } = req.headers;

    const user = await avaliacaoModel.findOne({
      cardapio: id,
      'avaliacoes.user_id': user_id,
    });

    if (user) {
      const result = await avaliacaoModel.updateOne(
        { cardapio: id, 'avaliacoes.user_id': user_id },
        { $set: { 'avaliacoes.$.nota': nota } }
      );
      return res.json(result);
    }

    const result = await avaliacaoModel.updateOne(
      { cardapio: id },
      {
        $push: { avaliacoes: { user_id, nota } },
      }
    );

    return res.json(result);
  }

  async average(req, res) {
    const { id } = req.params;

    const result = await avaliacaoModel.findOne({ cardapio: id });

    const notas = result.avaliacoes.reduce((acumulado, item) => {
      return acumulado + item.nota;
    }, 0);

    const votos = result.avaliacoes.length;
    const media = notas / votos;
    return res.json({ id, media, votos });
  }

  async comment(req, res) {
    const { comentario } = req.body;
    const { id } = req.params;
    const { user_id } = req.headers;

    const comment = { user_id, comentario };

    try {
      const result = await comentarioModel.updateOne(
        { cardapio: id },
        {
          $push: { comentarios: comment },
        }
      );
      return res.json(result);
    } catch (error) {
      return res.status(400).json({ error });
    }
  }

  async delete(req, res) {
    const { id } = req.params;

    const result = await cardapioModel.deleteOne({ _id: id });
    await cache.del(`cardapio:${id}`);

    return res.json(result);
  }

  async update(req, res) {
    const { id } = req.params;
    const {
      tipo,
      entrada,
      proteina,
      opcao,
      acompanhamento,
      guarnicao,
      sobremesa,
    } = req.body;

    const result = await cardapioModel.updateOne(
      { _id: id },
      {
        $set: {
          tipo,
          entrada: {
            descricao: entrada,
          },
          proteina: {
            descricao: proteina,
          },
          opcao: {
            descricao: opcao,
          },
          acompanhamento: {
            descricao: acompanhamento,
          },
          guarnicao: {
            descricao: guarnicao,
          },
          sobremesa: {
            descricao: sobremesa,
          },
        },
      }
    );
    await cache.del(`cardapio:${id}`);
    return res.json(result);
  }

  async readComments(req, res) {
    const { id } = req.params;

    const result = await comentarioModel.findOne({ cardapio: id });

    return res.json(result);
  }
}
module.exports = new CardapioController();
