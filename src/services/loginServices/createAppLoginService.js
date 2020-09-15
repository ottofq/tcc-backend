const jwt = require('jsonwebtoken');
const studentRepository = require('../../repositories/studentRepository');
const passwordUtil = require('../../utils/passwordUtils');

class CreateAppLoginService {
  async handle(email, password) {
    try {
      const studentExists = await studentRepository.findByEmailPass(email);

      if (!studentExists) {
        throw Error('Usuário não existente na base de dados!');
      }

      const verifyPassword = await passwordUtil.comparePassword(
        password,
        studentExists.hash_password
      );

      if (!verifyPassword) {
        throw Error('Email/password incorreto!');
      }
      const { _id } = studentExists;

      const token = jwt.sign({ _id }, process.env.JWT_SECRET, {
        expiresIn: '7d',
      });

      studentExists.hash_password = undefined;

      return { student: studentExists, auth: { token } };
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

module.exports = new CreateAppLoginService();
