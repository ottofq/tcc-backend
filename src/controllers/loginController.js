const createLoginService = require('../services/loginServices/createLoginService');
const createAppLoginService = require('../services/loginServices/createAppLoginService');

class Login {
  async create(req, res) {
    const { email, password } = req.body;

    try {
      const user = await createLoginService.handle(email, password);
      return res.status(200).json(user);
    } catch (error) {
      return res.status(error.statusCode).json({
        error: error.name,
        message: error.message,
        statusCode: error.statusCode,
      });
    }
  }

  async createAppLogin(req, res) {
    const { email, password } = req.body;

    try {
      const user = await createAppLoginService.handle(email, password);
      return res.status(200).json(user);
    } catch (error) {
      return res.status(error.statusCode).json({
        error: error.name,
        message: error.message,
        statusCode: error.statusCode,
      });
    }
  }
}

module.exports = new Login();
