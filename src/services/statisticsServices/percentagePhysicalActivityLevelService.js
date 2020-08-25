const studentRepository = require('../../repositories/studentRepository');

class PercentagePhysicalActivityLevelService {
  async handle() {
    try {
      const physcialLevel = await studentRepository.percentagePhysicalActivityLevel();
      const totalStudents = await studentRepository.countStudents();

      return { total_alunos: totalStudents, totais: physcialLevel[0] };
    } catch (error) {
      throw Error(error.message);
    }
  }
}

module.exports = new PercentagePhysicalActivityLevelService();
