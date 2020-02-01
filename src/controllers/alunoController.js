const alunoModel = require('../models/alunoModel');

class AlunoController {
  async create(req, res) {
    const {
      nome,
      matricula,
      data_nascimento,
      ano_ingresso,
      sexo,
      bolsa: { bolsista, tipo },
      questionario: {
        frequencia_RU,
        refeicao_RU,
        nivel_fisico,
        peso_ideal,
        alergias: { nenhuma, gluten, lactose, proteina_leite, outros },
        vegetariano: {
          isVegano,
          ovolactovegetariano,
          vegetariano_restrito,
          vegano,
        },
        adiciona_sal,
        adiciona_oleo,
        consome_alcool,
        frequencia_alcool,
        tabagista,
        patologias: {
          doenca_cardiovascular,
          hipertensao,
          obesidade,
          dislipidemias,
          doenca_arterial_coronariana,
          diabetes,
          outras,
        },
        patologias_familia: {
          fam_doenca_cardiovascular,
          fam_hipertensao,
          fam_obesidade,
          fam_dislipidemias,
          fam_doenca_arterial_coronariana,
          fam_diabetes,
          fam_outras,
        },
        medicamento_continuo,
      },
      avaliacao_RU: {
        aroma,
        coloracao_cardapio,
        textura_preparacao,
        sabor_preparacao,
        avaliacao_geral,
        melhorias: {
          cardapio,
          melhorias_sabor_preparacao,
          opcao_vegetariana,
          estrutura_fisica,
          tempo_fila,
          preco_ticket,
          melhorias_outros,
        },
      },
    } = req.body;

    const aluno = {
      nome,
      matricula,
      data_nascimento,
      ano_ingresso,
      sexo,
      bolsa: { bolsista, tipo },
      questionario: {
        frequencia_RU,
        refeicao_RU,
        nivel_fisico,
        peso_ideal,
        alergias: { nenhuma, gluten, lactose, proteina_leite, outros },
        vegetariano: {
          isVegano,
          ovolactovegetariano,
          vegetariano_restrito,
          vegano,
        },
        adiciona_sal,
        adiciona_oleo,
        consome_alcool,
        frequencia_alcool,
        tabagista,
        patologias: {
          doenca_cardiovascular,
          hipertensao,
          obesidade,
          dislipidemias,
          doenca_arterial_coronariana,
          diabetes,
          outras,
        },
        patologias_familia: {
          fam_doenca_cardiovascular,
          fam_hipertensao,
          fam_obesidade,
          fam_dislipidemias,
          fam_doenca_arterial_coronariana,
          fam_diabetes,
          fam_outras,
        },
        medicamento_continuo,
        avaliacao_RU: {
          aroma,
          coloracao_cardapio,
          textura_preparacao,
          sabor_preparacao,
          avaliacao_geral,
          melhorias: {
            cardapio,
            melhorias_sabor_preparacao,
            opcao_vegetariana,
            estrutura_fisica,
            tempo_fila,
            preco_ticket,
            melhorias_outros,
          },
        },
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
