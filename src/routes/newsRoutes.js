const { Router } = require('express');

const newsController = require('../controllers/newsController');
const auth = require('../middlewares/authMiddleware');
const { idValidator, newsValidator } = require('../middlewares/validators');

const newsRoutes = Router();

newsRoutes.use(auth);

newsRoutes.post('/', newsValidator.create, newsController.create);
newsRoutes.get('/', newsValidator.list, newsController.list);
newsRoutes.get('/:id', idValidator, newsController.find);
newsRoutes.put(
  '/:id',
  idValidator,
  newsValidator.update,
  newsController.update
);
newsRoutes.delete('/:id', idValidator, newsController.delete);

module.exports = newsRoutes;
