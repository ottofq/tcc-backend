const studentRepository = require('../../repositories/studentRepository');
const InternalServerError = require('../../utils/errors/internalServerError');

class PercentageVegans {
  async handle() {
    try {
      const vegans = await studentRepository.percentageVegans();
      const totalStudents = await studentRepository.countStudents();

      return { total_alunos: totalStudents, totais: vegans[0] };
    } catch (error) {
      throw new InternalServerError('Internal Server Error');
    }
  }
}

module.exports = new PercentageVegans();
