const { Router } = require('express');

const menuController = require('../controllers/menuController');
const ratingController = require('../controllers/ratingController');
const auth = require('../middlewares/authMiddleware');

const menuRoutes = Router();

menuRoutes.use(auth);

menuRoutes.get('/', menuController.readAll);
menuRoutes.get('/last', menuController.readLast);
menuRoutes.get('/:id', menuController.readOne);
menuRoutes.get('/:id/comentarios', ratingController.listComments);
menuRoutes.get('/avg/:id', ratingController.average);
menuRoutes.post('/', menuController.create);
menuRoutes.post('/avaliar/:id', ratingController.create);
menuRoutes.put('/:id', menuController.update);
menuRoutes.delete('/:id', menuController.delete);

module.exports = menuRoutes;
