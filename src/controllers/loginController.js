const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');
const passwordUtil = require('../utils/passwordUtils');

class Login {
  async create(req, res) {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email }).select('+hash_password');

    if (!user) {
      return res.status(400).json({ error: 'usuário não encontrado!' });
    }

    if (!(await passwordUtil.comparePassword(password, user.hash_password))) {
      return res.status(400).json({ error: 'senha incorreta!' });
    }

    const { _id, nome } = user;

    return res.json({
      user: {
        _id,
        nome,
        email,
      },
      token: jwt.sign({ _id }, process.env.JWT_SECRET, {
        expiresIn: '7d',
      }),
    });
  }
}

module.exports = new Login();
