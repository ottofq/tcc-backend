const { ObjectId } = require('mongoose').Types;
const cardapioModel = require('../models/cardapioModel');
const avaliacaoModel = require('../models/avaliacaoModel');
const cache = require('../redis');
const alunoModel = require('../models/alunoModel');

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
    avaliacaoModel.create({ cardapio: id });

    return res.json(result);
  }

  async readLast(req, res) {
    const result = await cardapioModel.findOne().sort({ _id: -1 });

    return res.json(result);
  }

  async readAll(req, res) {
    try {
      const { page } = req.query;
      const skips = 8 * (page - 1);
      const total_cardapios = await cardapioModel.countDocuments();
      const result = await cardapioModel
        .find()
        .skip(skips)
        .limit(8)
        .sort({ _id: -1 });

      return res.json({ total_cardapios, result });
    } catch (error) {
      return res.status(400).json(error);
    }
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
    const { avaliacao, student_id, comentario, nome } = req.body;
    const { id } = req.params;
    // const { user_id } = req.headers;

    try {
      const student = await alunoModel.findById({ _id: student_id });

      if (student) {
        const studentRate = await avaliacaoModel.findOne({
          cardapio: id,
          'avaliacoes.student_id': student_id,
        });

        if (studentRate) {
          const result = await avaliacaoModel.updateOne(
            { cardapio: id, 'avaliacoes.student_id': student_id },
            {
              $set: {
                'avaliacoes.$.avaliacao': avaliacao,
                'avalicacoes.$.comentario': comentario,
                'avalicacoes.$.nome': student.nome,
              },
            }
          );
          return res.json(result);
        }

        const result = await avaliacaoModel.updateOne(
          { cardapio: id },
          {
            $push: {
              avaliacoes: {
                $each: [
                  { student_id, avaliacao, comentario, nome: student.nome },
                ],
                $position: 0,
              },
            },
          }
        );

        return res.json(result);
      } else {
        throw new Error('student not found');
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  async average(req, res) {
    const { id } = req.params;

    const avaliacao = await avaliacaoModel.aggregate([
      { $match: { cardapio: ObjectId(id) } },
      {
        $project: {
          totalAvaliacoes: { $size: '$avaliacoes' },
          avaliacao: {
            entrada: { $avg: '$avaliacoes.avaliacao.entrada' },
            prato_proteico: { $avg: '$avaliacoes.avaliacao.prato_proteico' },
            opcao: { $avg: '$avaliacoes.avaliacao.opcao' },
            acompanhamento: { $avg: '$avaliacoes.avaliacao.acompanhamento' },
            guarnicao: { $avg: '$avaliacoes.avaliacao.guarnicao' },
            sobremesa: { $avg: '$avaliacoes.avaliacao.sobremesa' },
          },
        },
      },
    ]);

    return res.json(avaliacao[0]);
  }

  async delete(req, res) {
    const { id } = req.params;

    const result = await cardapioModel.deleteOne({ _id: id });
    await avaliacaoModel.deleteOne({ cardapio: id });
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
    let { skip, limit } = req.query;
    skip = Number(skip);
    limit = Number(limit);

    const result = await avaliacaoModel.aggregate([
      { $match: { cardapio: ObjectId(id) } },
      {
        $project: {
          total_comentarios: { $size: '$avaliacoes.comentario' },
          avaliacoes: {
            $slice: ['$avaliacoes', skip, limit],
          },
        },
      },
    ]);

    return res.json(result[0]);
  }
}
module.exports = new CardapioController();
