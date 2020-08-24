const userModel = require('../models/userModel');

class UserRepository {
  async create(user) {
    try {
      const userCreated = await userModel.create(user);

      return userCreated;
    } catch (error) {
      throw Error(error.message);
    }
  }

  async list(skip, limit) {
    try {
      const users = await userModel
        .find()
        .skip(skip)
        .limit(limit)
        .sort({ _id: -1 });

      return users;
    } catch (error) {
      throw Error(error.message);
    }
  }

  async findEmail(email) {
    try {
      const user = await userModel.findOne({ email });

      return user;
    } catch (error) {
      throw Error(error.message);
    }
  }

  async findById(id) {
    try {
      const user = await userModel.findById(id).select('+hash_password');

      return user;
    } catch (error) {
      throw Error(error.message);
    }
  }

  async update(id, nome, hash_password) {
    try {
      const userUpdated = await userModel.updateOne(
        { _id: id },
        {
          $set: {
            nome,
            hash_password,
          },
        }
      );

      return userUpdated;
    } catch (error) {
      throw Error(error.message);
    }
  }

  async delete(id) {
    try {
      const result = await userModel.deleteOne({ _id: id });

      return result;
    } catch (error) {
      throw Error(error.message);
    }
  }
}

module.exports = new UserRepository();
