const studentRepository = require('../../repositories/studentRepository');

class PercentageSmokerService {
  async handle() {
    try {
      const smokers = await studentRepository.percentageSmoker();
      const totalStudents = await studentRepository.countStudents();

      return { total_alunos: totalStudents, totais: smokers[0] };
    } catch (error) {
      throw Error(error.message);
    }
  }
}

module.exports = new PercentageSmokerService();
