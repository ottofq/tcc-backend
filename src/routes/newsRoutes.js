const { Router } = require('express');

const newsController = require('../controllers/newsController');
const auth = require('../middlewares/authMiddleware');

const newsRoutes = Router();

newsRoutes.use(auth);

newsRoutes.post('/', newsController.create);
newsRoutes.get('/', newsController.list);
newsRoutes.get('/:id', newsController.find);
newsRoutes.put('/:id', newsController.update);
newsRoutes.delete('/:id', newsController.delete);

module.exports = newsRoutes;
