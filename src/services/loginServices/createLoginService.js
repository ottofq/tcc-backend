const jwt = require('jsonwebtoken');
const userRepository = require('../../repositories/userRepository');
const passwordUtil = require('../../utils/passwordUtils');

class CreateLoginService {
  async handle(email, password) {
    try {
      const userExists = await userRepository.findEmail(email);

      if (!userExists) {
        throw Error('Usuário não existente na base de dados!');
      }

      const verifyPassword = await passwordUtil.comparePassword(
        password,
        userExists.hash_password
      );

      if (!verifyPassword) {
        throw Error('Email/password incorreto!');
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
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

module.exports = new CreateLoginService();
