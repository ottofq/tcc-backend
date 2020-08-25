const studentRepository = require('../../repositories/studentRepository');

class CountPathologies {
  async handle() {
    try {
      const patologiesCount = await studentRepository.countPathologies();
      const totalStudents = await studentRepository.countStudents();

      return { total_alunos: totalStudents, totais: patologiesCount[0] };
    } catch (error) {
      throw Error(error.message);
    }
  }
}

module.exports = new CountPathologies();
