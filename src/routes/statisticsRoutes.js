const { Router } = require('express');

const studentStatisticsController = require('../controllers/studentStatisticsController');
const auth = require('../middlewares/authMiddleware');

const studentStatisticsRoutes = Router();

studentStatisticsRoutes.use(auth);

studentStatisticsRoutes.get(
  '/alergias',
  studentStatisticsController.countAllergies
);
studentStatisticsRoutes.get(
  '/patologias',
  studentStatisticsController.countPathologies
);
studentStatisticsRoutes.get(
  '/bolsistas',
  studentStatisticsController.percentageScholarship
);
studentStatisticsRoutes.get(
  '/frequencia',
  studentStatisticsController.percentageFrequencyMeals
);
studentStatisticsRoutes.get(
  '/tiporefeicao',
  studentStatisticsController.percentageTypeOfMeals
);
studentStatisticsRoutes.get(
  '/nivelatividadefisica',
  studentStatisticsController.percentagePhysicalActivityLevel
);
studentStatisticsRoutes.get(
  '/vegetariano',
  studentStatisticsController.percentageVegans
);
studentStatisticsRoutes.get(
  '/consumobebidaalcoolica',
  studentStatisticsController.percentageAlcoholConsumption
);
studentStatisticsRoutes.get(
  '/tabagista',
  studentStatisticsController.percentageSmoker
);
studentStatisticsRoutes.get(
  '/avaliacao',
  studentStatisticsController.percentageRatingMeals
);
studentStatisticsRoutes.get(
  '/avaliacaogeral',
  studentStatisticsController.percentageGeneralRating
);
studentStatisticsRoutes.get(
  '/melhoriasru',
  studentStatisticsController.countURImprovements
);

module.exports = studentStatisticsRoutes;
