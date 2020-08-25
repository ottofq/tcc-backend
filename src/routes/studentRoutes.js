const { Router } = require('express');

const studentController = require('../controllers/studentController');
const auth = require('../middlewares/authMiddleware');

const studentRoutes = Router();

studentRoutes.post('/', studentController.create);
studentRoutes.get('/', auth, studentController.list);
studentRoutes.get('/:id', auth, studentController.findOne);

module.exports = studentRoutes;
