const studentRepository = require('../../repositories/studentRepository');

class PercentageFrequencyMeals {
  async handle() {
    try {
      const frequencyOfMeals = await studentRepository.percentageFrequencyMeals();
      const totalStudents = await studentRepository.countStudents();

      return { total_alunos: totalStudents, totais: frequencyOfMeals[0] };
    } catch (error) {
      throw Error(error.message);
    }
  }
}

module.exports = new PercentageFrequencyMeals();
