const { Router } = require('express');

const menuController = require('../controllers/menuController');
const ratingController = require('../controllers/ratingController');
const auth = require('../middlewares/authMiddleware');
const { menuValidator, idValidator } = require('../middlewares/validators');

const menuRoutes = Router();

menuRoutes.use(auth);

menuRoutes.get('/', menuValidator.listAllMenus, menuController.readAll);
menuRoutes.get('/last', menuController.readLast);
menuRoutes.get('/:id', idValidator, menuController.readOne);
menuRoutes.get(
  '/:id/comentarios',
  idValidator,
  menuValidator.listComments,
  ratingController.listComments
);
menuRoutes.get('/avg/:id', idValidator, ratingController.average);
menuRoutes.post('/', menuValidator.create, menuController.create);
menuRoutes.post(
  '/avaliar/:id',
  idValidator,
  menuValidator.createRating,
  ratingController.create
);
menuRoutes.put(
  '/:id',
  idValidator,
  menuValidator.update,
  menuController.update
);
menuRoutes.delete('/:id', idValidator, menuController.delete);

module.exports = menuRoutes;
