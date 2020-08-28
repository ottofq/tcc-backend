const userRepository = require('../../repositories/userRepository');
const InternalServerError = require('../../utils/errors/internalServerError');
const NotFoundError = require('../../utils/errors/notFoundError');

class CreateUserService {
  async handle(id) {
    try {
      const userExists = await userRepository.findById(id);

      if (!userExists) {
        throw Error('User not found');
      }

      const deletedUser = await userRepository.delete(id);

      return deletedUser;
    } catch (error) {
      if (error.name === 'DBError') {
        throw new InternalServerError('Internal Server Error');
      }
      throw new NotFoundError(error.message);
    }
  }
}

module.exports = new CreateUserService();
