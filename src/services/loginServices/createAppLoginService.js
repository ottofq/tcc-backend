const jwt = require('jsonwebtoken');
const studentRepository = require('../../repositories/studentRepository');
const passwordUtil = require('../../utils/passwordUtils');
const ForbiddenError = require('../../utils/errors/forbiddenError');
const NotFoundError = require('../../utils/errors/notFoundError');

class CreateAppLoginService {
  async handle(email, password) {
    const studentExists = await studentRepository.findByEmailPass(email);

    if (!studentExists) {
      throw new NotFoundError('Usuário não existente na base de dados!');
    }

    const verifyPassword = await passwordUtil.comparePassword(
      password,
      studentExists.hash_password
    );

    if (!verifyPassword) {
      throw new ForbiddenError('Email/password incorreto!');
    }
    const { _id } = studentExists;

    const token = jwt.sign({ _id }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });

    studentExists.hash_password = undefined;

    return { student: studentExists, auth: { token } };
  }
}

module.exports = new CreateAppLoginService();
