const userRepository = require('../../repositories/userRepository');

class ListUserService {
  async handle(skip, limit) {
    try {
      const skipNumber = Number(skip);
      const limitNumber = Number(limit);

      const users = await userRepository.list(skipNumber, limitNumber);

      return users;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

module.exports = new ListUserService();
