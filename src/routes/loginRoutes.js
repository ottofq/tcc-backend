const { Router } = require('express');

const loginController = require('../controllers/loginController');
const { loginValidator } = require('../middlewares/validators');

const loginRoutes = Router();

loginRoutes.post('/', loginValidator.create, loginController.create);

module.exports = loginRoutes;
