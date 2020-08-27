const studentRespository = require('../../repositories/studentRepository');
const BadRequestError = require('../../utils/errors/badRequestError');
const InternalServerError = require('../../utils/errors/internalServerError');

class CreateStudentService {
  async handle(student) {
    try {
      const studentExists = await studentRespository.findByRegistration(
        student.matricula
      );

      if (studentExists) {
        throw Error('Já existe um aluno associado a essa matricula');
      }

      const studentCreated = await studentRespository.create(student);

      return studentCreated;
    } catch (error) {
      if (error.name === 'DBError') {
        throw new InternalServerError('Internal Server Error');
      }
      throw new BadRequestError(error.message);
    }
  }
}

module.exports = new CreateStudentService();
