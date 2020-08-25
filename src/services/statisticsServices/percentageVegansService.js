const studentRepository = require('../../repositories/studentRepository');

class PercentageVegans {
  async handle() {
    try {
      const vegans = await studentRepository.percentageVegans();
      const totalStudents = await studentRepository.countStudents();

      return { total_alunos: totalStudents, totais: vegans[0] };
    } catch (error) {
      throw Error(error.message);
    }
  }
}

module.exports = new PercentageVegans();
