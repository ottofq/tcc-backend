const studentRepository = require('../../repositories/studentRepository');

class PercentageAlcoholConsumption {
  async handle() {
    try {
      const alcoholConsumption = await studentRepository.percentageAlcoholConsumption();
      const totalStudents = await studentRepository.countStudents();

      return { total_alunos: totalStudents, totais: alcoholConsumption[0] };
    } catch (error) {
      throw Error(error.message);
    }
  }
}

module.exports = new PercentageAlcoholConsumption();
