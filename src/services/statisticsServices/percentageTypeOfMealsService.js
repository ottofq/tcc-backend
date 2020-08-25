const studentRepository = require('../../repositories/studentRepository');

class PercentageTypeOfMeals {
  async handle() {
    try {
      const typeOfMeals = await studentRepository.percentageTypeOfMeals();
      const totalStudents = await studentRepository.countStudents();

      return { total_alunos: totalStudents, totais: typeOfMeals[0] };
    } catch (error) {
      throw Error(error.message);
    }
  }
}

module.exports = new PercentageTypeOfMeals();
