const studentModel = require('../models/studentModel');
const DBError = require('../utils/errors/dbError');

class StudentRepository {
  async create(student) {
    try {
      const studentCreated = await studentModel.create(student);
      return studentCreated;
    } catch (error) {
      throw new DBError(error.message);
    }
  }

  async findById(id) {
    try {
      const student = await studentModel.findById(id);
      return student;
    } catch (error) {
      throw new DBError(error.message);
    }
  }

  async findByRegistration(registrationID) {
    try {
      const student = await studentModel.findOne({ matricula: registrationID });
      return student;
    } catch (error) {
      throw new DBError(error.message);
    }
  }

  async findByEmail(email) {
    try {
      const student = await studentModel.findOne({ email });
      return student;
    } catch (error) {
      throw new DBError(error.message);
    }
  }

  async findByEmailPass(email) {
    try {
      const student = await studentModel
        .findOne({ email })
        .select('+hash_password');
      return student;
    } catch (error) {
      throw new DBError(error.message);
    }
  }

  async list(skip, limit) {
    try {
      const students = await studentModel
        .find()
        .skip(skip)
        .limit(limit)
        .sort({ _id: -1 });

      return students;
    } catch (error) {
      throw new DBError(error.message);
    }
  }

  async countStudents() {
    try {
      const total_students = await studentModel.countDocuments();

      return total_students;
    } catch (error) {
      throw new DBError(error.message);
    }
  }

  async update(student) {
    try {
      const updatedStudent = await studentModel.updateOne(
        { _id: student._id },
        [
          {
            $set: {
              nome: student.nome,
              data_nascimento: student.data_nascimento,
              curso: student.curso,
              ano_ingresso: student.ano_ingresso,
              sexo: student.sexo,
              bolsista: student.bolsista,
              frequencia_RU: student.frequencia_RU,
              tipo_refeicao_RU: student.tipo_refeicao_RU,
              nivel_fisico: student.nivel_fisico,
              peso_ideal: student.peso_ideal,
              alergias: {
                alergia_gluten: student.alergias.alergia_gluten,
                intolerancia_lactose: student.alergias.intolerancia_lactose,
                proteina_leite_vaca: student.alergias.proteina_leite_vaca,
                outras_alergias: student.alergias.outras_alergias,
              },
              vegano_vegetariano: student.vegano_vegetariano,
              adiciona_sal: student.adiciona_sal,
              utiliza_oleo_composto: student.utiliza_oleo_composto,
              consome_bebida_alcoolica: student.consome_bebida_alcoolica,
              tabagista: student.tabagista,
              patologias: {
                doenca_cardiovascular: student.patologias.doenca_cardiovascular,
                hipertensao_arterial: student.patologias.hipertensao_arterial,
                obesidade: student.patologias.obesidade,
                dislipidemias: student.patologias.dislipidemias,
                doenca_arterial_coronariana:
                  student.patologias.doenca_arterial_coronariana,
                diabetes: student.patologias.diabetes,
                outras_patologias: student.patologias.outras_patologias,
              },
              patologias_familia: {
                fam_doenca_cardiovascular:
                  student.patologias_familia.fam_doenca_cardiovascular,
                fam_hipertensao: student.patologias_familia.fam_hipertensao,
                fam_obesidade: student.patologias_familia.fam_obesidade,
                fam_dislipidemias: student.patologias_familia.fam_dislipidemias,
                fam_doenca_arterial_coronariana:
                  student.patologias_familia.fam_doenca_arterial_coronariana,
                fam_diabetes: student.patologias_familia.fam_diabetes,
                patologias_familia_outras:
                  student.patologias_familia.patologias_familia_outras,
              },
              medicamento_continuo: student.medicamento_continuo,
              avaliacao_RU: {
                aroma: student.avaliacao_RU.aroma,
                coloracao_cardapio: student.avaliacao_RU.coloracao_cardapio,
                textura_preparacao: student.avaliacao_RU.textura_preparacao,
                sabor_preparacao: student.avaliacao_RU.sabor_preparacao,
                avaliacao_geral: student.avaliacao_RU.avaliacao_geral,
              },
              melhorias_RU: {
                cardapio: student.melhorias_RU.cardapio,
                melhoria_sabor_preparacao:
                  student.melhorias_RU.melhoria_sabor_preparacao,
                opcao_vegetariana: student.melhorias_RU.opcao_vegetariana,
                estrutura_fisica: student.melhorias_RU.estrutura_fisica,
                tempo_fila: student.melhorias_RU.tempo_fila,
                preco_ticket: student.melhorias_RU.preco_ticket,
                melhoria_outros: student.melhorias_RU.melhoria_outros,
              },
            },
          },
        ]
      );

      return updatedStudent;
    } catch (error) {
      throw new DBError(error.message);
    }
  }

  async countAllergies() {
    try {
      const allergiesCount = await studentModel.aggregate([
        {
          $facet: {
            nenhuma: [
              {
                $match: {
                  $and: [
                    { 'alergias.alergia_gluten': { $eq: false } },
                    { 'alergias.intolerancia_lactose': { $eq: false } },
                    { 'alergias.proteina_leite_vaca': { $eq: false } },
                    { 'alergias.outras_alergias': { $exists: false } },
                  ],
                },
              },
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
              { $match: { 'alergias.outras_alergias': { $exists: true } } },
              { $count: 'outras_alergias' },
            ],
          },
        },
        {
          $project: {
            nenhuma_alergia: {
              $arrayElemAt: ['$nenhuma.nenhuma', 0],
            },
            alergia_gluten: {
              $arrayElemAt: ['$alergia_gluten.alergia_gluten', 0],
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

      return allergiesCount;
    } catch (error) {
      throw new DBError(error.message);
    }
  }

  async percentageAllergies() {
    try {
      const totalStudents = await studentModel.countDocuments();

      const multiplicationFactor = 100 / totalStudents;

      const percentageAllergies = await studentModel.aggregate([
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
                multiplicationFactor,
              ],
            },
            alergia_gluten: {
              $multiply: [
                { $arrayElemAt: ['$alergia_gluten.alergia_gluten', 0] },
                multiplicationFactor,
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
                multiplicationFactor,
              ],
            },
            proteina_leite_vaca: {
              $multiply: [
                {
                  $arrayElemAt: ['$proteina_leite_vaca.proteina_leite_vaca', 0],
                },
                multiplicationFactor,
              ],
            },
            outras_alergias: {
              $multiply: [
                {
                  $arrayElemAt: ['$outras_alergias.outras_alergias', 0],
                },
                multiplicationFactor,
              ],
            },
          },
        },
      ]);
      return percentageAllergies;
    } catch (error) {
      throw new DBError(error.message);
    }
  }

  async countPathologies() {
    try {
      const countPatologies = await studentModel.aggregate([
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

      return countPatologies;
    } catch (error) {
      throw new DBError(error.message);
    }
  }

  async percentagePathologies() {
    try {
      const totalStudents = await studentModel.countDocuments();

      const multiplicationFactor = 100 / totalStudents;

      const percentagePathologies = await studentModel.aggregate([
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
                multiplicationFactor,
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
                multiplicationFactor,
              ],
            },
            obesidade: {
              $multiply: [
                {
                  $arrayElemAt: ['$obesidade.obesidade', 0],
                },
                multiplicationFactor,
              ],
            },
            dislipidemias: {
              $multiply: [
                {
                  $arrayElemAt: ['$dislipidemias.dislipidemias', 0],
                },
                multiplicationFactor,
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
                multiplicationFactor,
              ],
            },
            diabetes: {
              $multiply: [
                {
                  $arrayElemAt: ['$diabetes.diabetes', 0],
                },
                multiplicationFactor,
              ],
            },
            outras_patologias: {
              $multiply: [
                {
                  $arrayElemAt: ['$outras_patologias.outras_patologias', 0],
                },
                multiplicationFactor,
              ],
            },
          },
        },
      ]);

      return percentagePathologies;
    } catch (error) {
      throw new DBError(error.message);
    }
  }

  async percentageScholarship() {
    try {
      const totalStudents = await studentModel.countDocuments();

      const multiplicationFactor = 100 / totalStudents;

      const percentageScholarship = await studentModel.aggregate([
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
                multiplicationFactor,
              ],
            },
            bolsa_parcial: {
              $multiply: [
                {
                  $arrayElemAt: ['$bolsa_parcial.bolsa_parcial', 0],
                },
                multiplicationFactor,
              ],
            },
            nao_bolsista: {
              $multiply: [
                {
                  $arrayElemAt: ['$nao_bolsista.nao_bolsista', 0],
                },
                multiplicationFactor,
              ],
            },
          },
        },
      ]);

      return percentageScholarship;
    } catch (error) {
      throw new DBError(error.message);
    }
  }

  async percentageFrequencyMeals() {
    try {
      const totalStudents = await studentModel.countDocuments();

      const multiplicationFactor = 100 / totalStudents;

      const frequencyMeals = await studentModel.aggregate([
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
                multiplicationFactor,
              ],
            },
            semana_3vezes: {
              $multiply: [
                {
                  $arrayElemAt: ['$semana_3vezes.semana_3vezes', 0],
                },
                multiplicationFactor,
              ],
            },
            semana_1vez: {
              $multiply: [
                {
                  $arrayElemAt: ['$semana_1vez.semana_1vez', 0],
                },
                multiplicationFactor,
              ],
            },
            raramente: {
              $multiply: [
                {
                  $arrayElemAt: ['$raramente.raramente', 0],
                },
                multiplicationFactor,
              ],
            },
          },
        },
      ]);

      return frequencyMeals;
    } catch (error) {
      throw new DBError(error.message);
    }
  }

  async percentageTypeOfMeals() {
    try {
      const totalStudents = await studentModel.countDocuments();

      const multiplicationFactor = 100 / totalStudents;

      const percentageTypeOfMeals = await studentModel.aggregate([
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
                multiplicationFactor,
              ],
            },
            jantar: {
              $multiply: [
                {
                  $arrayElemAt: ['$jantar.jantar', 0],
                },
                multiplicationFactor,
              ],
            },
            almoco_jantar: {
              $multiply: [
                {
                  $arrayElemAt: ['$almoco_jantar.almoco_jantar', 0],
                },
                multiplicationFactor,
              ],
            },
          },
        },
      ]);

      return percentageTypeOfMeals;
    } catch (error) {
      throw new DBError(error.message);
    }
  }

  async percentagePhysicalActivityLevel() {
    try {
      const totalStudents = await studentModel.countDocuments();

      const multiplicationFactor = 100 / totalStudents;

      const physicalLevel = await studentModel.aggregate([
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
                multiplicationFactor,
              ],
            },
            leve: {
              $multiply: [
                {
                  $arrayElemAt: ['$leve.leve', 0],
                },
                multiplicationFactor,
              ],
            },
            moderado: {
              $multiply: [
                {
                  $arrayElemAt: ['$moderado.moderado', 0],
                },
                multiplicationFactor,
              ],
            },
            ativo: {
              $multiply: [
                {
                  $arrayElemAt: ['$ativo.ativo', 0],
                },
                multiplicationFactor,
              ],
            },
          },
        },
      ]);

      return physicalLevel;
    } catch (error) {
      throw new DBError(error.message);
    }
  }

  async percentageVegans() {
    try {
      const totalStudents = await studentModel.countDocuments();

      const multiplicationFactor = 100 / totalStudents;

      const vegans = await studentModel.aggregate([
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
                multiplicationFactor,
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
                multiplicationFactor,
              ],
            },
            vegano: {
              $multiply: [
                {
                  $arrayElemAt: ['$vegano.vegano', 0],
                },
                multiplicationFactor,
              ],
            },
            nao_vegano: {
              $multiply: [
                {
                  $arrayElemAt: ['$nao_vegano.nao_vegano', 0],
                },
                multiplicationFactor,
              ],
            },
          },
        },
      ]);

      return vegans;
    } catch (error) {
      throw new DBError(error.message);
    }
  }

  async percentageAlcoholConsumption() {
    try {
      const totalStudents = await studentModel.countDocuments();

      const multiplicationFactor = 100 / totalStudents;

      const alcoholConsumption = await studentModel.aggregate([
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
                multiplicationFactor,
              ],
            },
            semana_3vezes: {
              $multiply: [
                {
                  $arrayElemAt: ['$semana_3vezes.semana_3vezes', 0],
                },
                multiplicationFactor,
              ],
            },
            semana_1vez: {
              $multiply: [
                {
                  $arrayElemAt: ['$semana_1vez.semana_1vez', 0],
                },
                multiplicationFactor,
              ],
            },
            raramente: {
              $multiply: [
                {
                  $arrayElemAt: ['$raramente.raramente', 0],
                },
                multiplicationFactor,
              ],
            },
            nao_consome: {
              $multiply: [
                {
                  $arrayElemAt: ['$nao_consome.nao_consome', 0],
                },
                multiplicationFactor,
              ],
            },
          },
        },
      ]);

      return alcoholConsumption;
    } catch (error) {
      throw new DBError(error.message);
    }
  }

  async percentageSmoker() {
    try {
      const totalStudents = await studentModel.countDocuments();

      const multiplicationFactor = 100 / totalStudents;

      const smokers = await studentModel.aggregate([
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
                multiplicationFactor,
              ],
            },
            nao_tabagista: {
              $multiply: [
                {
                  $arrayElemAt: ['$nao_tabagista.nao_tabagista', 0],
                },
                multiplicationFactor,
              ],
            },
          },
        },
      ]);

      return smokers;
    } catch (error) {
      throw new DBError(error.message);
    }
  }

  async percentageRatingMeals() {
    try {
      const totalStudents = await studentModel.countDocuments();

      const multiplicationFactor = 100 / totalStudents;

      const ratingsParams = [
        'avaliacao_RU.aroma',
        'avaliacao_RU.coloracao_cardapio',
        'avaliacao_RU.textura_preparacao',
        'avaliacao_RU.sabor_preparacao',
      ];

      const ratings = ratingsParams.map(item =>
        studentModel.aggregate([
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
                  multiplicationFactor,
                ],
              },
              bom: {
                $multiply: [
                  {
                    $arrayElemAt: ['$bom.bom', 0],
                  },
                  multiplicationFactor,
                ],
              },
              regular: {
                $multiply: [
                  {
                    $arrayElemAt: ['$regular.regular', 0],
                  },
                  multiplicationFactor,
                ],
              },
              ruim: {
                $multiply: [
                  {
                    $arrayElemAt: ['$ruim.ruim', 0],
                  },
                  multiplicationFactor,
                ],
              },
              muito_ruim: {
                $multiply: [
                  {
                    $arrayElemAt: ['$muito_ruim.muito_ruim', 0],
                  },
                  multiplicationFactor,
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
      ] = await Promise.all(ratings);

      return { aroma, coloracao_cardapio, textura_preparacao, sabor };
    } catch (error) {
      throw new DBError(error.message);
    }
  }

  async percentageGeneralRating() {
    try {
      const totalStudents = await studentModel.countDocuments();

      const multiplicationFactor = 100 / totalStudents;

      const generalRatings = await studentModel.aggregate([
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
                multiplicationFactor,
              ],
            },
            bom: {
              $multiply: [
                {
                  $arrayElemAt: ['$bom.bom', 0],
                },
                multiplicationFactor,
              ],
            },
            regular: {
              $multiply: [
                {
                  $arrayElemAt: ['$regular.regular', 0],
                },
                multiplicationFactor,
              ],
            },
            ruim: {
              $multiply: [
                {
                  $arrayElemAt: ['$ruim.ruim', 0],
                },
                multiplicationFactor,
              ],
            },
            muito_ruim: {
              $multiply: [
                {
                  $arrayElemAt: ['$muito_ruim.muito_ruim', 0],
                },
                multiplicationFactor,
              ],
            },
          },
        },
      ]);

      return generalRatings;
    } catch (error) {
      throw new DBError(error.message);
    }
  }

  async countURImprovements() {
    try {
      const improvements = await studentModel.aggregate([
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

      return improvements;
    } catch (error) {
      throw new DBError(error.message);
    }
  }
}

module.exports = new StudentRepository();
