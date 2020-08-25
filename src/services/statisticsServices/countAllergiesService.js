const studentRepository = require('../../repositories/studentRepository');

class CountAllergiesService {
  async handle() {
    try {
      const allergiesCount = await studentRepository.countAllergies();
      const totalStudents = await studentRepository.countStudents();

      return { total_alunos: totalStudents, totais: allergiesCount[0] };
    } catch (error) {
      throw Error(error.message);
    }
  }
}

module.exports = new CountAllergiesService();
