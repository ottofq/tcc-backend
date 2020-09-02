const studentRepository = require('../../repositories/studentRepository');
const InternalServerError = require('../../utils/errors/internalServerError');

class CountURImprovementsService {
  async handle() {
    try {
      const improvements = await studentRepository.countURImprovements();
      const totalStudents = await studentRepository.countStudents();

      return { total_alunos: totalStudents, totais: improvements[0] };
    } catch (error) {
      throw new InternalServerError('Internal Server Error');
    }
  }
}

module.exports = new CountURImprovementsService();
