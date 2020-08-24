const userRepository = require('../../repositories/userRepository');
const passwordUtils = require('../../utils/passwordUtils');

class UpdateUserService {
  async handle(id, nome, oldPassword, newPassword) {
    try {
      const user = await userRepository.findById(id);

      if (!user) {
        throw Error('Usuário não existe na base de dados!');
      }

      const password = await passwordUtils.comparePassword(
        oldPassword,
        user.hash_password
      );

      if (!password) {
        throw Error('Senha incorreta!');
      }

      const hash_password = await passwordUtils.hashPassword(newPassword);

      const userUpdated = await userRepository.update(id, nome, hash_password);

      return userUpdated;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

module.exports = new UpdateUserService();
