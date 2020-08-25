const studentRepository = require('../../repositories/studentRepository');

class PercentageRatingMealsService {
  async handle() {
    try {
      const ratings = await studentRepository.percentageRatingMeals();
      const totalStudents = await studentRepository.countStudents();

      return {
        total_alunos: totalStudents,
        totais: {
          aroma: ratings.aroma[0],
          coloracao_cardapio: ratings.coloracao_cardapio[0],
          textura_preparacao: ratings.textura_preparacao[0],
          sabor: ratings.sabor[0],
        },
      };
    } catch (error) {
      throw Error(error.message);
    }
  }
}

module.exports = new PercentageRatingMealsService();
