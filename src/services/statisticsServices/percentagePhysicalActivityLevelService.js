const studentRepository = require('../../repositories/studentRepository');
const InternalServerError = require('../../utils/errors/internalServerError');

class PercentagePhysicalActivityLevelService {
  async handle() {
    try {
      const physcialLevel = await studentRepository.percentagePhysicalActivityLevel();
      const totalStudents = await studentRepository.countStudents();

      return { total_alunos: totalStudents, totais: physcialLevel[0] };
    } catch (error) {
      throw new InternalServerError('Internal Server Error');
    }
  }
}

module.exports = new PercentagePhysicalActivityLevelService();
