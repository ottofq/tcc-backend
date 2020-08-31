const { Router } = require('express');

const userController = require('../controllers/userController');
const auth = require('../middlewares/authMiddleware');
const { userValidator, idValidator } = require('../middlewares/validators');

const usersRoutes = Router();

usersRoutes.post('/', userValidator.create, userController.create);
usersRoutes.get('/', auth, userValidator.list, userController.list);
usersRoutes.put(
  '/:id',
  idValidator,
  userValidator.update,
  auth,
  userController.update
);
usersRoutes.delete('/:id', idValidator, auth, userController.delete);

module.exports = usersRoutes;
