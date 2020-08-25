const studentRepository = require('../../repositories/studentRepository');

class PercentageScholarshipService {
  async handle() {
    try {
      const percentageScholarship = await studentRepository.percentageScholarship();
      const totalStudents = await studentRepository.countStudents();

      return { total_alunos: totalStudents, totais: percentageScholarship[0] };
    } catch (error) {
      throw Error(error.message);
    }
  }
}

module.exports = new PercentageScholarshipService();
