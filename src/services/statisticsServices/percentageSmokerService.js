const studentRepository = require('../../repositories/studentRepository');
const InternalServerError = require('../../utils/errors/internalServerError');

class PercentageSmokerService {
  async handle() {
    try {
      const smokers = await studentRepository.percentageSmoker();
      const totalStudents = await studentRepository.countStudents();

      return { total_alunos: totalStudents, totais: smokers[0] };
    } catch (error) {
      throw new InternalServerError('Internal Server Error');
    }
  }
}

module.exports = new PercentageSmokerService();
