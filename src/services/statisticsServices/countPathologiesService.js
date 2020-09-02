const studentRepository = require('../../repositories/studentRepository');
const InternalServerError = require('../../utils/errors/internalServerError');

class CountPathologies {
  async handle() {
    try {
      const patologiesCount = await studentRepository.countPathologies();
      const totalStudents = await studentRepository.countStudents();

      return { total_alunos: totalStudents, totais: patologiesCount[0] };
    } catch (error) {
      throw new InternalServerError('Internal Server Error');
    }
  }
}

module.exports = new CountPathologies();
