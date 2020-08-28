const userRepository = require('../../repositories/userRepository');
const InternalServerError = require('../../utils/errors/internalServerError');

class ListUserService {
  async handle(skip, limit) {
    try {
      const skipNumber = Number(skip);
      const limitNumber = Number(limit);

      const users = await userRepository.list(skipNumber, limitNumber);

      return users;
    } catch (error) {
      throw new InternalServerError(error.message);
    }
  }
}

module.exports = new ListUserService();
