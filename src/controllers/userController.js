const UserModel = require('../models/userModel');
const passwordUtil = require('../utils/passwordUtils');

class User {
  async create(req, res) {
    const { nome, email, password } = req.body;

    const hash_password = await passwordUtil.hashPassword(password);
    const user = { nome, email, hash_password };

    try {
      const result = await UserModel.create(user);
      result.hash_password = null;
      return res.json(result);
    } catch (error) {
      return res.status(400).json(error);
    }
  }

  async read(req, res) {
    try {
      const result = await UserModel.find();
      return res.json(result);
    } catch (error) {
      return res.status(400).json(error);
    }
  }

  async update(req, res) {
    const { nome, oldPassword, newPassword } = req.body;
    const { id } = req.params;

    const user = await UserModel.findById({ _id: id }).select('+hash_password');

    if (!user) {
      return res.status(400).json({ error: 'usuário não encontrado!' });
    }

    const password = await passwordUtil.comparePassword(
      oldPassword,
      user.hash_password
    );

    if (!password) {
      return res.status(401).json({ error: 'Senha incorreta!' });
    }

    try {
      const hash_password = await passwordUtil.hashPassword(newPassword);
      const result = await UserModel.updateOne(
        { _id: id },
        {
          nome,
          hash_password,
        }
      );
      return res.json(result);
    } catch (error) {
      return res.status(400).json(error);
    }
  }

  async delete(req, res) {
    const { id } = req.params;

    try {
      const result = await UserModel.deleteOne({ _id: id });

      return res.json(result);
    } catch (error) {
      return res.status(400).json(error);
    }
  }
}

module.exports = new User();
