const { Router } = require('express');

const studentController = require('../controllers/studentController');
const auth = require('../middlewares/authMiddleware');
const { idValidator } = require('../middlewares/validators');

const studentRoutes = Router();

studentRoutes.post('/', studentController.create);
studentRoutes.get('/', auth, studentController.list);
studentRoutes.get('/findEmail/:email', studentController.findByEmail);
studentRoutes.get(
  '/findMatricula/:matricula',
  studentController.findByRegistation
);
studentRoutes.get('/:id', idValidator, auth, studentController.findOne);

module.exports = studentRoutes;
