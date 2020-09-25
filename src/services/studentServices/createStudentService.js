const jwt = require('jsonwebtoken');
const studentRespository = require('../../repositories/studentRepository');
const BadRequestError = require('../../utils/errors/badRequestError');
const InternalServerError = require('../../utils/errors/internalServerError');
const passwordUtils = require('../../utils/passwordUtils');

class CreateStudentService {
  async handle(student) {
    try {
      const emailExists = await studentRespository.findByEmail(student.email);

      if (emailExists) {
        throw Error('Já existe um aluno associado a esse email');
      }

      const studentExists = await studentRespository.findByRegistration(
        student.matricula
      );

      if (studentExists) {
        throw Error('Já existe um aluno associado a essa matricula');
      }

      const hash_password = await passwordUtils.hashPassword(student.password);

      const studentWithPassHashed = { ...student, hash_password };
      delete studentWithPassHashed.password;

      const studentCreated = await studentRespository.create(
        studentWithPassHashed
      );

      studentCreated.hash_password = undefined;
      const { _id } = studentCreated;

      const token = jwt.sign({ _id }, process.env.JWT_SECRET, {
        expiresIn: '7d',
      });

      return { student: studentCreated, auth: { token } };
    } catch (error) {
      if (error.name === 'DBError') {
        throw new InternalServerError('Internal Server Error');
      }
      throw new BadRequestError(error.message);
    }
  }
}

module.exports = new CreateStudentService();
