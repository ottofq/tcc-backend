const { Schema, model } = require('mongoose');

const alunoSchema = new Schema({
  nome: {
    type: String,
    required: true,
  },
  matricula: {
    type: Number,
    required: true,
    unique: true,
  },
  data_nascimento: {
    type: String,
    required: true,
  },
  ano_ingresso: {
    type: Number,
    required: true,
  },
  sexo: {
    type: String,
    required: true,
  },
  bolsa: {
    bolsista: {
      type: Boolean,
      required: true,
    },
    tipo: {
      type: String,
    },
  },
  questionario: {
    frequencia_RU: {
      type: String,
      required: true,
    },
    refeicao_RU: {
      type: String,
      required: true,
    },
    nivel_fisico: {
      type: String,
      required: true,
    },
    peso_ideal: {
      type: String,
      required: true,
    },
    alergias: {
      nenhuma: Boolean,
      gluten: Boolean,
      lactose: Boolean,
      proteina_leite: Boolean,
      outros: String,
    },
    vegetariano: {
      isVegano: Boolean,
      ovolactovegetariano: Boolean,
      vegetariano_restrito: Boolean,
      vegano: Boolean,
    },
    adiciona_sal: {
      type: Boolean,
      required: true,
    },
    adiciona_oleo: {
      type: Boolean,
      required: true,
    },
    consome_alcool: {
      type: Boolean,
      required: true,
    },
    frequencia_alcool: {
      type: String,
      required: true,
    },
    tabagista: {
      type: Boolean,
      required: true,
    },
    patologias: {
      doenca_cardiovascular: Boolean,
      hipertensao: Boolean,
      obesidade: Boolean,
      dislipidemias: Boolean,
      doenca_arterial_coronariana: Boolean,
      diabetes: Boolean,
      outras: String,
    },
    patologias_familia: {
      fam_doenca_cardiovascular: Boolean,
      fam_hipertensao: Boolean,
      fam_obesidade: Boolean,
      fam_dislipidemias: Boolean,
      fam_doenca_arterial_coronariana: Boolean,
      fam_diabetes: Boolean,
      fam_outras: String,
    },
    medicamento_continuo: {
      type: String,
    },
  },
  avaliacao_RU: {
    aroma: Number,
    coloracao_cardapio: Number,
    textura_preparacao: Number,
    sabor_preparacao: Number,
    avaliacao_geral: Number,
    melhorias: {
      cardapio: Boolean,
      melhorias_sabor_preparacao: Boolean,
      opcao_vegetariana: Boolean,
      estrutura_fisica: Boolean,
      tempo_fila: Boolean,
      preco_ticket: Boolean,
      melhorias_outros: String,
    },
  },
});

module.exports = model('Aluno', alunoSchema);
