const jwt = require('jsonwebtoken');
const userRepository = require('../../repositories/userRepository');
const passwordUtil = require('../../utils/passwordUtils');
const ForbiddenError = require('../../utils/errors/forbiddenError');
const NotFoundError = require('../../utils/errors/notFoundError');

class CreateLoginService {
  async handle(email, password) {
    const userExists = await userRepository.findEmail(email);

    if (!userExists) {
      throw new NotFoundError('Usuário não existente na base de dados!');
    }

    const verifyPassword = await passwordUtil.comparePassword(
      password,
      userExists.hash_password
    );

    if (!verifyPassword) {
      throw new ForbiddenError('Email/password incorreto!');
    }

    const { _id, nome } = userExists;

    return {
      user: {
        _id,
        nome,
        email,
      },
      token: jwt.sign({ _id }, process.env.JWT_SECRET, {
        expiresIn: '7d',
      }),
    };
  }
}

module.exports = new CreateLoginService();
