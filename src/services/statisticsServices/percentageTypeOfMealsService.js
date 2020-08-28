const studentRepository = require('../../repositories/studentRepository');
const InternalServerError = require('../../utils/errors/internalServerError');

class PercentageTypeOfMeals {
  async handle() {
    try {
      const typeOfMeals = await studentRepository.percentageTypeOfMeals();
      const totalStudents = await studentRepository.countStudents();

      return { total_alunos: totalStudents, totais: typeOfMeals[0] };
    } catch (error) {
      throw new InternalServerError('Internal Server Error');
    }
  }
}

module.exports = new PercentageTypeOfMeals();
