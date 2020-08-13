const alunoModel = require('../models/studentModel');
const {
  createStudentService,
  listStudentsService,
} = require('../services/studentServices');

class StudentController {
  async create(req, res) {
    const {
      nome,
      matricula,
      data_nascimento,
      curso,
      ano_ingresso,
      sexo,
      bolsista,
      frequencia_RU,
      tipo_refeicao_RU,
      nivel_fisico,
      peso_ideal,
      alergias: {
        nenhuma,
        alergia_gluten,
        intolerancia_lactose,
        proteina_leite_vaca,
        outras_alergias,
      },
      vegano_vegetariano,
      adiciona_sal,
      utiliza_oleo_composto,
      consome_bebida_alcoolica,
      frequencia_alcool,
      tabagista,
      patologias: {
        doenca_cardiovascular,
        hipertensao_arterial,
        obesidade,
        dislipidemias,
        doenca_arterial_coronariana,
        diabetes,
        outras_patologias,
      },
      patologias_familia: {
        fam_doenca_cardiovascular,
        fam_hipertensao,
        fam_obesidade,
        fam_dislipidemias,
        fam_doenca_arterial_coronariana,
        fam_diabetes,
        patologias_familia_outras,
      },
      medicamento_continuo,
      avaliacao_RU: {
        aroma,
        coloracao_cardapio,
        textura_preparacao,
        sabor_preparacao,
        avaliacao_geral,
      },
      melhorias_RU: {
        cardapio,
        melhoria_sabor_preparacao,
        opcao_vegetariana,
        estrutura_fisica,
        tempo_fila,
        preco_ticket,
        melhoria_outros,
      },
    } = req.body;

    const student = {
      nome,
      matricula,
      data_nascimento,
      curso,
      ano_ingresso,
      sexo,
      bolsista,
      frequencia_RU,
      tipo_refeicao_RU,
      nivel_fisico,
      peso_ideal,
      alergias: {
        nenhuma,
        alergia_gluten,
        intolerancia_lactose,
        proteina_leite_vaca,
        outras_alergias,
      },
      vegano_vegetariano,
      adiciona_sal,
      utiliza_oleo_composto,
      consome_bebida_alcoolica,
      frequencia_alcool,
      tabagista,
      patologias: {
        doenca_cardiovascular,
        hipertensao_arterial,
        obesidade,
        dislipidemias,
        doenca_arterial_coronariana,
        diabetes,
        outras_patologias,
      },
      patologias_familia: {
        fam_doenca_cardiovascular,
        fam_hipertensao,
        fam_obesidade,
        fam_dislipidemias,
        fam_doenca_arterial_coronariana,
        fam_diabetes,
        patologias_familia_outras,
      },
      medicamento_continuo,
      avaliacao_RU: {
        aroma,
        coloracao_cardapio,
        textura_preparacao,
        sabor_preparacao,
        avaliacao_geral,
      },
      melhorias_RU: {
        cardapio,
        melhoria_sabor_preparacao,
        opcao_vegetariana,
        estrutura_fisica,
        tempo_fila,
        preco_ticket,
        melhoria_outros,
      },
    };

    try {
      const studentCreated = await createStudentService.handle(student);
      return res.status(200).json(studentCreated);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  async readAll(req, res) {
    try {
      const { page } = req.query;
      const skip = 8 * (page - 1);
      const limit = 8;

      const { total_students, students } = await listStudentsService.handle(
        skip,
        limit
      );

      return res.status(200).json({ total_students, students });
    } catch (error) {
      return res.status(400).json(error);
    }
  }

  async readOne(req, res) {
    const { id } = req.params;

    try {
      const result = await alunoModel.findById({ _id: id });
      return res.json(result);
    } catch (error) {
      return res.status(400).json({ error: 'Aluno não encontrado' });
    }
  }

  async porcetagemAlergia(req, res) {
    try {
      const total_alunos = await alunoModel.countDocuments();
      const result = await alunoModel.aggregate([
        {
          $facet: {
            nenhuma: [
              { $match: { 'alergias.nenhuma': { $eq: true } } },
              { $count: 'nenhuma' },
            ],
            alergia_gluten: [
              { $match: { 'alergias.alergia_gluten': { $eq: true } } },
              { $count: 'alergia_gluten' },
            ],
            intolerancia_lactose: [
              { $match: { 'alergias.intolerancia_lactose': { $eq: true } } },
              { $count: 'intolerancia_lactose' },
            ],
            proteina_leite_vaca: [
              { $match: { 'alergias.proteina_leite_vaca': { $eq: true } } },
              { $count: 'proteina_leite_vaca' },
            ],
            outras_alergias: [
              { $match: { 'alergias.outras_alergias': { $ne: null } } },
              { $count: 'outras_alergias' },
            ],
          },
        },

        {
          $project: {
            nenhuma_alergia: {
              $multiply: [
                { $arrayElemAt: ['$nenhuma.nenhuma', 0] },
                100 / total_alunos,
              ],
            },
            alergia_gluten: {
              $multiply: [
                { $arrayElemAt: ['$alergia_gluten.alergia_gluten', 0] },
                100 / total_alunos,
              ],
            },
            intolerancia_lactose: {
              $multiply: [
                {
                  $arrayElemAt: [
                    '$intolerancia_lactose.intolerancia_lactose',
                    0,
                  ],
                },
                100 / total_alunos,
              ],
            },
            proteina_leite_vaca: {
              $multiply: [
                {
                  $arrayElemAt: ['$proteina_leite_vaca.proteina_leite_vaca', 0],
                },
                100 / total_alunos,
              ],
            },
            outras_alergias: {
              $multiply: [
                {
                  $arrayElemAt: ['$outras_alergias.outras_alergias', 0],
                },
                100 / total_alunos,
              ],
            },
          },
        },
      ]);
      return res.json({ total_alunos, porcentagem: result[0] });
    } catch (error) {
      return res.status(400).json({ error });
    }
  }

  async countAlergias(req, res) {
    try {
      const total_alunos = await alunoModel.countDocuments();
      const result = await alunoModel.aggregate([
        {
          $facet: {
            nenhuma: [
              { $match: { 'alergias.nenhuma': { $eq: true } } },
              { $count: 'nenhuma' },
            ],
            alergia_gluten: [
              { $match: { 'alergias.alergia_gluten': { $eq: true } } },
              { $count: 'alergia_gluten' },
            ],
            intolerancia_lactose: [
              { $match: { 'alergias.intolerancia_lactose': { $eq: true } } },
              { $count: 'intolerancia_lactose' },
            ],
            proteina_leite_vaca: [
              { $match: { 'alergias.proteina_leite_vaca': { $eq: true } } },
              { $count: 'proteina_leite_vaca' },
            ],
            outras_alergias: [
              { $match: { 'alergias.outras_alergias': { $exists: 1 } } },
              { $count: 'outras_alergias' },
            ],
          },
        },
        {
          $project: {
            nenhuma_alergia: {
              $multiply: { $arrayElemAt: ['$nenhuma.nenhuma', 0] },
            },
            alergia_gluten: {
              $multiply: {
                $arrayElemAt: ['$alergia_gluten.alergia_gluten', 0],
              },
            },
            intolerancia_lactose: {
              $arrayElemAt: ['$intolerancia_lactose.intolerancia_lactose', 0],
            },
            proteina_leite_vaca: {
              $arrayElemAt: ['$proteina_leite_vaca.proteina_leite_vaca', 0],
            },
            outras_alergias: {
              $arrayElemAt: ['$outras_alergias.outras_alergias', 0],
            },
          },
        },
      ]);
      return res.json({ total_alunos, totais: result[0] });
    } catch (error) {
      return res.status(400).json({ error });
    }
  }

  async countPatologias(req, res) {
    try {
      const total_alunos = await alunoModel.countDocuments();
      const result = await alunoModel.aggregate([
        {
          $facet: {
            doenca_cardiovascular: [
              { $match: { 'patologias.doenca_cardiovascular': { $eq: true } } },
              { $count: 'doenca_cardiovascular' },
            ],
            hipertensao_arterial: [
              { $match: { 'patologias.hipertensao_arterial': { $eq: true } } },
              { $count: 'hipertensao_arterial' },
            ],
            obesidade: [
              { $match: { 'patologias.obesidade': { $eq: true } } },
              { $count: 'obesidade' },
            ],
            dislipidemias: [
              { $match: { 'patologias.dislipidemias': { $eq: true } } },
              { $count: 'dislipidemias' },
            ],
            doenca_arterial_coronariana: [
              {
                $match: {
                  'patologias.doenca_arterial_coronariana': { $eq: true },
                },
              },
              { $count: 'doenca_arterial_coronariana' },
            ],
            diabetes: [
              {
                $match: {
                  'patologias.diabetes': { $eq: true },
                },
              },
              { $count: 'diabetes' },
            ],
            outras_patologias: [
              {
                $match: {
                  'patologias.outras_patologias': { $exists: 1 },
                },
              },
              { $count: 'outras_patologias' },
            ],
          },
        },
        {
          $project: {
            doenca_cardiovascular: {
              $arrayElemAt: ['$doenca_cardiovascular.doenca_cardiovascular', 0],
            },
            hipertensao_arterial: {
              $arrayElemAt: ['$hipertensao_arterial.hipertensao_arterial', 0],
            },
            obesidade: {
              $arrayElemAt: ['$obesidade.obesidade', 0],
            },
            dislipidemias: {
              $arrayElemAt: ['$dislipidemias.dislipidemias', 0],
            },
            doenca_arterial_coronariana: {
              $arrayElemAt: [
                '$doenca_arterial_coronariana.doenca_arterial_coronariana',
                0,
              ],
            },
            diabetes: {
              $arrayElemAt: ['$diabetes.diabetes', 0],
            },
            outras_patologias: {
              $arrayElemAt: ['$outras_patologias.outras_patologias', 0],
            },
          },
        },
      ]);
      return res.json({ total_alunos, totais: result[0] });
    } catch (error) {
      return res.status(400).json({ error });
    }
  }

  async porcetagemPatologia(req, res) {
    try {
      const total_alunos = await alunoModel.countDocuments();
      const result = await alunoModel.aggregate([
        {
          $facet: {
            doenca_cardiovascular: [
              { $match: { 'patologias.doenca_cardiovascular': { $eq: true } } },
              { $count: 'doenca_cardiovascular' },
            ],
            hipertensao_arterial: [
              { $match: { 'patologias.hipertensao_arterial': { $eq: true } } },
              { $count: 'hipertensao_arterial' },
            ],
            obesidade: [
              { $match: { 'patologias.obesidade': { $eq: true } } },
              { $count: 'obesidade' },
            ],
            dislipidemias: [
              { $match: { 'patologias.dislipidemias': { $eq: true } } },
              { $count: 'dislipidemias' },
            ],
            doenca_arterial_coronariana: [
              {
                $match: {
                  'patologias.doenca_arterial_coronariana': { $eq: true },
                },
              },
              { $count: 'doenca_arterial_coronariana' },
            ],
            diabetes: [
              {
                $match: {
                  'patologias.diabetes': { $eq: true },
                },
              },
              { $count: 'diabetes' },
            ],
            outras_patologias: [
              {
                $match: {
                  'patologias.outras_patologias': { $exists: 1 },
                },
              },
              { $count: 'outras_patologias' },
            ],
          },
        },
        {
          $project: {
            doenca_cardiovascular: {
              $multiply: [
                {
                  $arrayElemAt: [
                    '$doenca_cardiovascular.doenca_cardiovascular',
                    0,
                  ],
                },
                100 / total_alunos,
              ],
            },
            hipertensao_arterial: {
              $multiply: [
                {
                  $arrayElemAt: [
                    '$hipertensao_arterial.hipertensao_arterial',
                    0,
                  ],
                },
                100 / total_alunos,
              ],
            },
            obesidade: {
              $multiply: [
                {
                  $arrayElemAt: ['$obesidade.obesidade', 0],
                },
                100 / total_alunos,
              ],
            },
            dislipidemias: {
              $multiply: [
                {
                  $arrayElemAt: ['$dislipidemias.dislipidemias', 0],
                },
                100 / total_alunos,
              ],
            },
            doenca_arterial_coronariana: {
              $multiply: [
                {
                  $arrayElemAt: [
                    '$doenca_arterial_coronariana.doenca_arterial_coronariana',
                    0,
                  ],
                },
                100 / total_alunos,
              ],
            },
            diabetes: {
              $multiply: [
                {
                  $arrayElemAt: ['$diabetes.diabetes', 0],
                },
                100 / total_alunos,
              ],
            },
            outras_patologias: {
              $multiply: [
                {
                  $arrayElemAt: ['$outras_patologias.outras_patologias', 0],
                },
                100 / total_alunos,
              ],
            },
          },
        },
      ]);
      return res.json({ total_alunos, porcentagem: result[0] });
    } catch (error) {
      return res.status(400).json({ error });
    }
  }

  async porcentagemBolsista(req, res) {
    try {
      const total_alunos = await alunoModel.countDocuments();
      const result = await alunoModel.aggregate([
        {
          $facet: {
            bolsa_integral: [
              { $match: { bolsista: { $eq: 'Bolsa integral' } } },
              { $count: 'bolsa_integral' },
            ],
            bolsa_parcial: [
              { $match: { bolsista: { $eq: 'Bolsa parcial' } } },
              { $count: 'bolsa_parcial' },
            ],
            nao_bolsista: [
              {
                $match: { bolsista: { $eq: 'Não sou bolsista' } },
              },
              { $count: 'nao_bolsista' },
            ],
          },
        },
        {
          $project: {
            bolsa_integral: {
              $multiply: [
                {
                  $arrayElemAt: ['$bolsa_integral.bolsa_integral', 0],
                },
                100 / total_alunos,
              ],
            },
            bolsa_parcial: {
              $multiply: [
                {
                  $arrayElemAt: ['$bolsa_parcial.bolsa_parcial', 0],
                },
                100 / total_alunos,
              ],
            },
            nao_bolsista: {
              $multiply: [
                {
                  $arrayElemAt: ['$nao_bolsista.nao_bolsista', 0],
                },
                100 / total_alunos,
              ],
            },
          },
        },
      ]);
      return res.json({ total_alunos, porcentagem: result[0] });
    } catch (error) {
      return res.status(400).json({ error });
    }
  }

  async porcentagemFrequenciaRU(req, res) {
    try {
      const total_alunos = await alunoModel.countDocuments();
      const result = await alunoModel.aggregate([
        {
          $facet: {
            todo_dia: [
              { $match: { frequencia_RU: { $eq: 'Todos os dias' } } },
              { $count: 'todo_dia' },
            ],
            semana_3vezes: [
              {
                $match: {
                  frequencia_RU: { $eq: 'Pelo menos 3 vezes na semana' },
                },
              },
              { $count: 'semana_3vezes' },
            ],
            semana_1vez: [
              {
                $match: {
                  frequencia_RU: { $eq: 'Pelo menos 1 vez na semana' },
                },
              },
              { $count: 'semana_1vez' },
            ],
            raramente: [
              {
                $match: {
                  frequencia_RU: { $eq: 'Raramente' },
                },
              },
              { $count: 'raramente' },
            ],
          },
        },
        {
          $project: {
            todo_dia: {
              $multiply: [
                {
                  $arrayElemAt: ['$todo_dia.todo_dia', 0],
                },
                100 / total_alunos,
              ],
            },
            semana_3vezes: {
              $multiply: [
                {
                  $arrayElemAt: ['$semana_3vezes.semana_3vezes', 0],
                },
                100 / total_alunos,
              ],
            },
            semana_1vez: {
              $multiply: [
                {
                  $arrayElemAt: ['$semana_1vez.semana_1vez', 0],
                },
                100 / total_alunos,
              ],
            },
            raramente: {
              $multiply: [
                {
                  $arrayElemAt: ['$raramente.raramente', 0],
                },
                100 / total_alunos,
              ],
            },
          },
        },
      ]);
      return res.json({ total_alunos, porcentagem: result[0] });
    } catch (error) {
      return res.status(400).json({ error });
    }
  }

  async porcentagemTipoRefeicaoRU(req, res) {
    try {
      const total_alunos = await alunoModel.countDocuments();
      const result = await alunoModel.aggregate([
        {
          $facet: {
            almoco: [
              { $match: { tipo_refeicao_RU: { $eq: 'Almoço' } } },
              { $count: 'almoco' },
            ],
            jantar: [
              {
                $match: {
                  tipo_refeicao_RU: { $eq: 'Jantar' },
                },
              },
              { $count: 'jantar' },
            ],
            almoco_jantar: [
              {
                $match: {
                  tipo_refeicao_RU: { $eq: 'Almoço e Jantar' },
                },
              },
              { $count: 'almoco_jantar' },
            ],
          },
        },
        {
          $project: {
            almoco: {
              $multiply: [
                {
                  $arrayElemAt: ['$almoco.almoco', 0],
                },
                100 / total_alunos,
              ],
            },
            jantar: {
              $multiply: [
                {
                  $arrayElemAt: ['$jantar.jantar', 0],
                },
                100 / total_alunos,
              ],
            },
            almoco_jantar: {
              $multiply: [
                {
                  $arrayElemAt: ['$almoco_jantar.almoco_jantar', 0],
                },
                100 / total_alunos,
              ],
            },
          },
        },
      ]);
      return res.json({ total_alunos, porcentagem: result[0] });
    } catch (error) {
      return res.status(400).json({ error });
    }
  }

  async porcentagemNivelAtividadeFisica(req, res) {
    try {
      const total_alunos = await alunoModel.countDocuments();
      const result = await alunoModel.aggregate([
        {
          $facet: {
            sedentario: [
              { $match: { nivel_fisico: { $eq: 'Sedentário' } } },
              { $count: 'sedentario' },
            ],
            leve: [
              {
                $match: {
                  nivel_fisico: { $eq: 'Leve' },
                },
              },
              { $count: 'leve' },
            ],
            moderado: [
              {
                $match: {
                  nivel_fisico: { $eq: 'Moderado' },
                },
              },
              { $count: 'moderado' },
            ],
            ativo: [
              {
                $match: {
                  nivel_fisico: { $eq: 'Ativo' },
                },
              },
              { $count: 'ativo' },
            ],
          },
        },
        {
          $project: {
            sedentario: {
              $multiply: [
                {
                  $arrayElemAt: ['$sedentario.sedentario', 0],
                },
                100 / total_alunos,
              ],
            },
            leve: {
              $multiply: [
                {
                  $arrayElemAt: ['$leve.leve', 0],
                },
                100 / total_alunos,
              ],
            },
            moderado: {
              $multiply: [
                {
                  $arrayElemAt: ['$moderado.moderado', 0],
                },
                100 / total_alunos,
              ],
            },
            ativo: {
              $multiply: [
                {
                  $arrayElemAt: ['$ativo.ativo', 0],
                },
                100 / total_alunos,
              ],
            },
          },
        },
      ]);
      return res.json({ total_alunos, porcentagem: result[0] });
    } catch (error) {
      return res.status(400).json({ error });
    }
  }

  async porcentagemVeganoVegetariano(req, res) {
    try {
      const total_alunos = await alunoModel.countDocuments();
      const result = await alunoModel.aggregate([
        {
          $facet: {
            ovolactovegetariano: [
              {
                $match: { vegano_vegetariano: { $eq: 'Ovolactovegetariano' } },
              },
              { $count: 'ovolactovegetariano' },
            ],
            vegetariano_restrito: [
              {
                $match: {
                  vegano_vegetariano: {
                    $eq: 'Vegetariano restrito – alimentação',
                  },
                },
              },
              { $count: 'vegetariano_restrito' },
            ],
            vegano: [
              {
                $match: {
                  vegano_vegetariano: { $eq: 'Vegano' },
                },
              },
              { $count: 'vegano' },
            ],
            nao_vegano: [
              {
                $match: {
                  vegano_vegetariano: { $eq: 'Não sou vegano/vegetariano' },
                },
              },
              { $count: 'nao_vegano' },
            ],
          },
        },
        {
          $project: {
            ovolactovegetariano: {
              $multiply: [
                {
                  $arrayElemAt: ['$ovolactovegetariano.ovolactovegetariano', 0],
                },
                100 / total_alunos,
              ],
            },
            vegetariano_restrito: {
              $multiply: [
                {
                  $arrayElemAt: [
                    '$vegetariano_restrito.vegetariano_restrito',
                    0,
                  ],
                },
                100 / total_alunos,
              ],
            },
            vegano: {
              $multiply: [
                {
                  $arrayElemAt: ['$vegano.vegano', 0],
                },
                100 / total_alunos,
              ],
            },
            nao_vegano: {
              $multiply: [
                {
                  $arrayElemAt: ['$nao_vegano.nao_vegano', 0],
                },
                100 / total_alunos,
              ],
            },
          },
        },
      ]);
      return res.json({ total_alunos, porcentagem: result[0] });
    } catch (error) {
      return res.status(400).json({ error });
    }
  }

  async porcentagemConsumoBebidaAlcoolica(req, res) {
    try {
      const total_alunos = await alunoModel.countDocuments();
      const result = await alunoModel.aggregate([
        {
          $facet: {
            diariamente: [
              {
                $match: {
                  consome_bebida_alcoolica: { $eq: 'Diariamente' },
                },
              },
              { $count: 'diariamente' },
            ],
            semana_3vezes: [
              {
                $match: {
                  consome_bebida_alcoolica: {
                    $eq: 'de 3-6 vezes na semana',
                  },
                },
              },
              { $count: 'semana_3vezes' },
            ],
            semana_1vez: [
              {
                $match: {
                  consome_bebida_alcoolica: { $eq: 'de 1-2 vezes na semana' },
                },
              },
              { $count: 'semana_1vez' },
            ],
            raramente: [
              {
                $match: {
                  consome_bebida_alcoolica: {
                    $eq: 'Raramente',
                  },
                },
              },
              { $count: 'raramente' },
            ],
            nao_consome: [
              {
                $match: {
                  consome_bebida_alcoolica: {
                    $eq: 'Não consumo bebidas alcoólicas',
                  },
                },
              },
              { $count: 'nao_consome' },
            ],
          },
        },
        {
          $project: {
            diariamente: {
              $multiply: [
                {
                  $arrayElemAt: ['$diariamente.diariamente', 0],
                },
                100 / total_alunos,
              ],
            },
            semana_3vezes: {
              $multiply: [
                {
                  $arrayElemAt: ['$semana_3vezes.semana_3vezes', 0],
                },
                100 / total_alunos,
              ],
            },
            semana_1vez: {
              $multiply: [
                {
                  $arrayElemAt: ['$semana_1vez.semana_1vez', 0],
                },
                100 / total_alunos,
              ],
            },
            raramente: {
              $multiply: [
                {
                  $arrayElemAt: ['$raramente.raramente', 0],
                },
                100 / total_alunos,
              ],
            },
            nao_consome: {
              $multiply: [
                {
                  $arrayElemAt: ['$nao_consome.nao_consome', 0],
                },
                100 / total_alunos,
              ],
            },
          },
        },
      ]);
      return res.json({ total_alunos, porcentagem: result[0] });
    } catch (error) {
      return res.status(400).json({ error });
    }
  }

  async porcentagemTabagista(req, res) {
    try {
      const total_alunos = await alunoModel.countDocuments();
      const result = await alunoModel.aggregate([
        {
          $facet: {
            tabagista: [
              {
                $match: {
                  tabagista: { $eq: true },
                },
              },
              { $count: 'tabagista' },
            ],
            nao_tabagista: [
              {
                $match: {
                  tabagista: {
                    $eq: false,
                  },
                },
              },
              { $count: 'nao_tabagista' },
            ],
          },
        },
        {
          $project: {
            tabagista: {
              $multiply: [
                {
                  $arrayElemAt: ['$tabagista.tabagista', 0],
                },
                100 / total_alunos,
              ],
            },
            nao_tabagista: {
              $multiply: [
                {
                  $arrayElemAt: ['$nao_tabagista.nao_tabagista', 0],
                },
                100 / total_alunos,
              ],
            },
          },
        },
      ]);
      return res.json({ total_alunos, porcentagem: result[0] });
    } catch (error) {
      return res.status(400).json({ error });
    }
  }

  async porcentagemAvaliacao(req, res) {
    try {
      const avaliacoes = [
        'avaliacao_RU.aroma',
        'avaliacao_RU.coloracao_cardapio',
        'avaliacao_RU.textura_preparacao',
        'avaliacao_RU.sabor_preparacao',
      ];

      const total_alunos = await alunoModel.countDocuments();

      const result = avaliacoes.map(item =>
        alunoModel.aggregate([
          {
            $facet: {
              muito_bom: [
                {
                  $match: {
                    [item]: { $eq: 'Muito bom' },
                  },
                },
                { $count: 'muito_bom' },
              ],
              bom: [
                {
                  $match: {
                    [item]: {
                      $eq: 'Bom',
                    },
                  },
                },
                { $count: 'bom' },
              ],
              regular: [
                {
                  $match: {
                    [item]: {
                      $eq: 'Regular',
                    },
                  },
                },
                { $count: 'regular' },
              ],
              ruim: [
                {
                  $match: {
                    [item]: {
                      $eq: 'Ruim',
                    },
                  },
                },
                { $count: 'ruim' },
              ],
              muito_ruim: [
                {
                  $match: {
                    [item]: {
                      $eq: 'Muito ruim',
                    },
                  },
                },
                { $count: 'muito_ruim' },
              ],
            },
          },
          {
            $project: {
              muito_bom: {
                $multiply: [
                  {
                    $arrayElemAt: ['$muito_bom.muito_bom', 0],
                  },
                  100 / total_alunos,
                ],
              },
              bom: {
                $multiply: [
                  {
                    $arrayElemAt: ['$bom.bom', 0],
                  },
                  100 / total_alunos,
                ],
              },
              regular: {
                $multiply: [
                  {
                    $arrayElemAt: ['$regular.regular', 0],
                  },
                  100 / total_alunos,
                ],
              },
              ruim: {
                $multiply: [
                  {
                    $arrayElemAt: ['$ruim.ruim', 0],
                  },
                  100 / total_alunos,
                ],
              },
              muito_ruim: {
                $multiply: [
                  {
                    $arrayElemAt: ['$muito_ruim.muito_ruim', 0],
                  },
                  100 / total_alunos,
                ],
              },
            },
          },
        ])
      );

      const [
        aroma,
        coloracao_cardapio,
        textura_preparacao,
        sabor,
      ] = await Promise.all(result);

      return res.json({
        total_alunos,
        porcentagem: {
          aroma: aroma[0],
          coloracao_cardapio: coloracao_cardapio[0],
          textura_preparacao: textura_preparacao[0],
          sabor: sabor[0],
        },
      });
    } catch (error) {
      return res.status(400).json({ error });
    }
  }

  async porcentagemAvaliacaoGeral(req, res) {
    try {
      const total_alunos = await alunoModel.countDocuments();

      const result = await alunoModel.aggregate([
        {
          $facet: {
            muito_bom: [
              {
                $match: {
                  'avaliacao_RU.avaliacao_geral': { $eq: 'Muito bom' },
                },
              },
              { $count: 'muito_bom' },
            ],
            bom: [
              {
                $match: {
                  'avaliacao_RU.avaliacao_geral': {
                    $eq: 'Bom',
                  },
                },
              },
              { $count: 'bom' },
            ],
            regular: [
              {
                $match: {
                  'avaliacao_RU.avaliacao_geral': {
                    $eq: 'Regular',
                  },
                },
              },
              { $count: 'regular' },
            ],
            ruim: [
              {
                $match: {
                  'avaliacao_RU.avaliacao_geral': {
                    $eq: 'Ruim',
                  },
                },
              },
              { $count: 'ruim' },
            ],
            muito_ruim: [
              {
                $match: {
                  'avaliacao_RU.avaliacao_geral': {
                    $eq: 'Muito ruim',
                  },
                },
              },
              { $count: 'muito_ruim' },
            ],
          },
        },
        {
          $project: {
            muito_bom: {
              $multiply: [
                {
                  $arrayElemAt: ['$muito_bom.muito_bom', 0],
                },
                100 / total_alunos,
              ],
            },
            bom: {
              $multiply: [
                {
                  $arrayElemAt: ['$bom.bom', 0],
                },
                100 / total_alunos,
              ],
            },
            regular: {
              $multiply: [
                {
                  $arrayElemAt: ['$regular.regular', 0],
                },
                100 / total_alunos,
              ],
            },
            ruim: {
              $multiply: [
                {
                  $arrayElemAt: ['$ruim.ruim', 0],
                },
                100 / total_alunos,
              ],
            },
            muito_ruim: {
              $multiply: [
                {
                  $arrayElemAt: ['$muito_ruim.muito_ruim', 0],
                },
                100 / total_alunos,
              ],
            },
          },
        },
      ]);

      return res.json({
        total_alunos,
        porcentagem: result[0],
      });
    } catch (error) {
      return res.status(400).json({ error });
    }
  }

  async countMelhoriaRU(req, res) {
    try {
      const total_alunos = await alunoModel.countDocuments();
      const result = await alunoModel.aggregate([
        {
          $facet: {
            cardapio: [
              { $match: { 'melhorias_RU.cardapio': { $eq: true } } },
              { $count: 'cardapio' },
            ],
            sabor_preparacao: [
              {
                $match: {
                  'melhorias_RU.melhoria_sabor_preparacao': { $eq: true },
                },
              },
              { $count: 'sabor_preparacao' },
            ],
            opcao_vegetariana: [
              {
                $match: {
                  'melhorias_RU.opcao_vegetariana': { $eq: true },
                },
              },
              { $count: 'opcao_vegetariana' },
            ],
            estrutura_fisica: [
              { $match: { 'melhorias_RU.estrutura_fisica': { $eq: true } } },
              { $count: 'estrutura_fisica' },
            ],
            tempo_fila: [
              {
                $match: {
                  'melhorias_RU.tempo_fila': { $eq: true },
                },
              },
              { $count: 'tempo_fila' },
            ],
            preco_ticket: [
              {
                $match: {
                  'melhorias_RU.preco_ticket': { $eq: true },
                },
              },
              { $count: 'preco_ticket' },
            ],
            melhoria_outros: [
              {
                $match: {
                  'melhorias_RU.melhoria_outros': { $exists: 1 },
                },
              },
              { $count: 'melhoria_outros' },
            ],
          },
        },
        {
          $project: {
            cardapio: {
              $arrayElemAt: ['$cardapio.cardapio', 0],
            },
            sabor_preparacao: {
              $arrayElemAt: ['$sabor_preparacao.sabor_preparacao', 0],
            },
            opcao_vegetariana: {
              $arrayElemAt: ['$opcao_vegetariana.opcao_vegetariana', 0],
            },
            estrutura_fisica: {
              $arrayElemAt: ['$estrutura_fisica.estrutura_fisica', 0],
            },
            tempo_fila: {
              $arrayElemAt: ['$tempo_fila.tempo_fila', 0],
            },
            preco_ticket: {
              $arrayElemAt: ['$preco_ticket.preco_ticket', 0],
            },
            melhoria_outros: {
              $arrayElemAt: ['$melhoria_outros.melhoria_outros', 0],
            },
          },
        },
      ]);
      return res.json({ total_alunos, totais: result[0] });
    } catch (error) {
      return res.status(400).json({ error });
    }
  }
}
module.exports = new StudentController();
