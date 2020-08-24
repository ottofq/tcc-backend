const userRepository = require('../../repositories/userRepository');

class CreateUserService {
  async handle(id) {
    try {
      const userExists = await userRepository.findById(id);

      if (!userExists) {
        throw Error('Usuário não existente na base de dados!');
      }

      const deletedUser = await userRepository.delete(id);

      return deletedUser;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

module.exports = new CreateUserService();
