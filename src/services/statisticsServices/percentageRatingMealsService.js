const studentRepository = require('../../repositories/studentRepository');
const InternalServerError = require('../../utils/errors/internalServerError');

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
      throw new InternalServerError('Internal Server Error');
    }
  }
}

module.exports = new PercentageRatingMealsService();
