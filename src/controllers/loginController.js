const createLoginService = require('../services/loginServices/createLoginService');

class Login {
  async create(req, res) {
    const { email, password } = req.body;

    try {
      const user = await createLoginService.handle(email, password);
      return res.status(200).json(user);
    } catch (error) {
      return res.status(401).json({ error: error.message });
    }
  }
}

module.exports = new Login();
