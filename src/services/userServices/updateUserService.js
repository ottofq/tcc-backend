const userRepository = require('../../repositories/userRepository');
const passwordUtils = require('../../utils/passwordUtils');
const InternalServerError = require('../../utils/errors/internalServerError');
const BadRequestError = require('../../utils/errors/badRequestError');

class UpdateUserService {
  async handle(id, nome, oldPassword, newPassword) {
    try {
      const user = await userRepository.findById(id);

      if (!user) {
        throw Error('Usuário não encontrado');
      }

      const password = await passwordUtils.comparePassword(
        oldPassword,
        user.hash_password
      );

      if (!password) {
        throw Error('Senha incorreta');
      }

      const hash_password = await passwordUtils.hashPassword(newPassword);

      const userUpdated = await userRepository.update(id, nome, hash_password);

      return userUpdated;
    } catch (error) {
      if (error.name === 'DBError') {
        throw new InternalServerError('Internal Server Error');
      }
      throw new BadRequestError(error.message);
    }
  }
}

module.exports = new UpdateUserService();
