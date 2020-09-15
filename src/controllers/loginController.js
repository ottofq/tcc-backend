const createLoginService = require('../services/loginServices/createLoginService');
const createAppLoginService = require('../services/loginServices/createAppLoginService');

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

  async createAppLogin(req, res) {
    const { email, password } = req.body;

    try {
      const user = await createAppLoginService.handle(email, password);
      return res.status(200).json(user);
    } catch (error) {
      return res.status(401).json({ error: error.message });
    }
  }
}

module.exports = new Login();
