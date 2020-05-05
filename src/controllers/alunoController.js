const alunoModel = require('../models/alunoModel');

class AlunoController {
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

    const aluno = {
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
      const result = await alunoModel.create(aluno);
      return res.json(result);
    } catch (error) {
      return res.status(400).json(error);
    }
  }

  async readAll(req, res) {
    try {
      const result = await alunoModel.find();
      return res.json(result);
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
}
module.exports = new AlunoController();
