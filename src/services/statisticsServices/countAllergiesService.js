const studentRepository = require('../../repositories/studentRepository');
const InternalServerError = require('../../utils/errors/internalServerError');

class CountAllergiesService {
  async handle() {
    try {
      const allergiesCount = await studentRepository.countAllergies();
      const totalStudents = await studentRepository.countStudents();

      return { total_alunos: totalStudents, totais: allergiesCount[0] };
    } catch (error) {
      throw new InternalServerError('Internal Server Error');
    }
  }
}

module.exports = new CountAllergiesService();
