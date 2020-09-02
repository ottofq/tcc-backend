const studentRepository = require('../../repositories/studentRepository');
const InternalServerError = require('../../utils/errors/internalServerError');

class PercentageFrequencyMeals {
  async handle() {
    try {
      const frequencyOfMeals = await studentRepository.percentageFrequencyMeals();
      const totalStudents = await studentRepository.countStudents();

      return { total_alunos: totalStudents, totais: frequencyOfMeals[0] };
    } catch (error) {
      throw new InternalServerError('Internal Server Error');
    }
  }
}

module.exports = new PercentageFrequencyMeals();
