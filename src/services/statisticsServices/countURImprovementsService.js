const studentRepository = require('../../repositories/studentRepository');

class CountURImprovementsService {
  async handle() {
    try {
      const improvements = await studentRepository.countURImprovements();
      const totalStudents = await studentRepository.countStudents();

      return { total_alunos: totalStudents, totais: improvements[0] };
    } catch (error) {
      throw Error(error.message);
    }
  }
}

module.exports = new CountURImprovementsService();
