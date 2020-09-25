const { Router } = require('express');

const loginController = require('../controllers/loginController');
const { loginValidator } = require('../middlewares/validators');

const loginRoutes = Router();

loginRoutes.post('/login', loginValidator.create, loginController.create);
loginRoutes.post(
  '/loginApp',
  loginValidator.create,
  loginController.createAppLogin
);

module.exports = loginRoutes;
