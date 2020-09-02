const studentRepository = require('../../repositories/studentRepository');
const InternalServerError = require('../../utils/errors/internalServerError');

class PercentageScholarshipService {
  async handle() {
    try {
      const percentageScholarship = await studentRepository.percentageScholarship();
      const totalStudents = await studentRepository.countStudents();

      return { total_alunos: totalStudents, totais: percentageScholarship[0] };
    } catch (error) {
      throw new InternalServerError('Internal Server Error');
    }
  }
}

module.exports = new PercentageScholarshipService();
