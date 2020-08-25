const {
  createStudentService,
  listStudentsService,
  listStudentService,
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

  async list(req, res) {
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

  async findOne(req, res) {
    const { id } = req.params;

    try {
      const result = await listStudentService.handle(id);
      return res.json(result);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}
module.exports = new StudentController();
