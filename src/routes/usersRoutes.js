const { Router } = require('express');

const userController = require('../controllers/userController');
const auth = require('../middlewares/authMiddleware');

const usersRoutes = Router();

usersRoutes.post('/', userController.create);
usersRoutes.get('/', auth, userController.list);
usersRoutes.put('/:id', auth, userController.update);
usersRoutes.delete('/:id', auth, userController.delete);

module.exports = usersRoutes;
