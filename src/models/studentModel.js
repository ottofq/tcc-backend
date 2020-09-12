const { Schema, model } = require('mongoose');

const studentSchema = new Schema({
  nome: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  hash_password: {
    type: String,
    required: true,
    select: false,
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
  curso: {
    type: String,
    required: true,
  },
  ano_ingresso: {
    type: String,
    required: true,
  },
  sexo: {
    type: String,
    required: true,
  },
  bolsista: {
    type: String,
    required: true,
  },

  frequencia_RU: {
    type: String,
    required: true,
  },
  tipo_refeicao_RU: {
    type: String,
    required: true,
  },
  nivel_fisico: {
    type: String,
    required: true,
  },
  peso_ideal: {
    type: Boolean,
    required: true,
  },
  alergias: {
    nenhuma: Boolean,
    alergia_gluten: Boolean,
    intolerancia_lactose: Boolean,
    proteina_leite_vaca: Boolean,
    outras_alergias: String,
  },
  vegano_vegetariano: {
    type: String,
    required: true,
  },
  adiciona_sal: {
    type: Boolean,
    required: true,
  },
  utiliza_oleo_composto: {
    type: Boolean,
    required: true,
  },
  consome_bebida_alcoolica: {
    type: String,
    required: true,
  },
  tabagista: {
    type: Boolean,
    required: true,
  },
  patologias: {
    doenca_cardiovascular: Boolean,
    hipertensao_arterial: Boolean,
    obesidade: Boolean,
    dislipidemias: Boolean,
    diabetes: Boolean,
    doenca_arterial_coronariana: Boolean,
    outras_patologias: String,
  },
  patologias_familia: {
    fam_doenca_cardiovascular: Boolean,
    fam_hipertensao: Boolean,
    fam_obesidade: Boolean,
    fam_dislipidemias: Boolean,
    fam_doenca_arterial_coronariana: Boolean,
    fam_diabetes: Boolean,
    patologias_familia_outras: String,
  },
  medicamento_continuo: {
    type: String,
  },
  avaliacao_RU: {
    aroma: String,
    coloracao_cardapio: String,
    textura_preparacao: String,
    sabor_preparacao: String,
    avaliacao_geral: String,
  },
  melhorias_RU: {
    cardapio: Boolean,
    melhoria_sabor_preparacao: Boolean,
    opcao_vegetariana: Boolean,
    estrutura_fisica: Boolean,
    tempo_fila: Boolean,
    preco_ticket: Boolean,
    melhoria_outros: String,
  },
});

module.exports = model('student', studentSchema);
