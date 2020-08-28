const studentRepository = require('../../repositories/studentRepository');
const InternalServerError = require('../../utils/errors/internalServerError');

class PercentageAlcoholConsumption {
  async handle() {
    try {
      const alcoholConsumption = await studentRepository.percentageAlcoholConsumption();
      const totalStudents = await studentRepository.countStudents();

      return { total_alunos: totalStudents, totais: alcoholConsumption[0] };
    } catch (error) {
      throw new InternalServerError('Internal Server Error');
    }
  }
}

module.exports = new PercentageAlcoholConsumption();
