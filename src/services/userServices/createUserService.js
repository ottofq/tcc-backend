const userRepository = require('../../repositories/userRepository');
const passwordUtils = require('../../utils/passwordUtils');
const InternalServerError = require('../../utils/errors/internalServerError');
const BadRequestError = require('../../utils/errors/badRequestError');

class CreateUserService {
  async handle(user) {
    const { nome, email, password } = user;

    try {
      const userExists = await userRepository.findEmail(email);

      if (userExists) {
        throw Error('Jà existe um usuário associado a esse email');
      }

      const hash_password = await passwordUtils.hashPassword(password);

      const userCreated = await userRepository.create({
        nome,
        email,
        hash_password,
      });

      userCreated.hash_password = undefined;

      return userCreated;
    } catch (error) {
      if (error.name === 'DBError') {
        throw new InternalServerError('Internal Server Error');
      }
      throw new BadRequestError(error.message);
    }
  }
}

module.exports = new CreateUserService();
