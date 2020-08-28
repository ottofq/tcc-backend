const {
  countAllergiesService,
  countPathologiesService,
  percentageScholarshipService,
  percentageFrequencyMealsService,
  percentageTypeOfMealsService,
  percentagePhysicalActivityLevelService,
  percentageVegansService,
  percentageAlcoholConsumptionService,
  percentageSmokerService,
  percentageRatingMealsService,
  percentageGeneralRatingService,
  countURImprovementsService,
} = require('../services/statisticsServices');

class StudentStatisticsController {
  async countAllergies(req, res) {
    try {
      const allergies = await countAllergiesService.handle();

      return res.status(200).json(allergies);
    } catch (error) {
      return res.status(error.statusCode).json({ error: error.message });
    }
  }

  async countPathologies(req, res) {
    try {
      const pathologies = await countPathologiesService.handle();

      return res.status(200).json(pathologies);
    } catch (error) {
      return res.status(error.statusCode).json({ error: error.message });
    }
  }

  async percentageScholarship(req, res) {
    try {
      const scholarships = await percentageScholarshipService.handle();

      return res.status(200).json(scholarships);
    } catch (error) {
      return res.status(error.statusCode).json({ error: error.message });
    }
  }

  async percentageFrequencyMeals(req, res) {
    try {
      const frequencyOfMeals = await percentageFrequencyMealsService.handle();

      return res.status(200).json(frequencyOfMeals);
    } catch (error) {
      return res.status(error.statusCode).json({ error: error.message });
    }
  }

  async percentageTypeOfMeals(req, res) {
    try {
      const typeOfMeals = await percentageTypeOfMealsService.handle();

      return res.status(200).json(typeOfMeals);
    } catch (error) {
      return res.status(error.statusCode).json({ error: error.message });
    }
  }

  async percentagePhysicalActivityLevel(req, res) {
    try {
      const physicalLevel = await percentagePhysicalActivityLevelService.handle();

      return res.status(200).json(physicalLevel);
    } catch (error) {
      return res.status(error.statusCode).json({ error: error.message });
    }
  }

  async percentageVegans(req, res) {
    try {
      const vegans = await percentageVegansService.handle();

      return res.status(200).json(vegans);
    } catch (error) {
      return res.status(error.statusCode).json({ error: error.message });
    }
  }

  async percentageAlcoholConsumption(req, res) {
    try {
      const alcoholConsumption = await percentageAlcoholConsumptionService.handle();

      return res.status(200).json(alcoholConsumption);
    } catch (error) {
      return res.status(error.statusCode).json({ error: error.message });
    }
  }

  async percentageSmoker(req, res) {
    try {
      const smokers = await percentageSmokerService.handle();

      return res.status(200).json(smokers);
    } catch (error) {
      return res.status(error.statusCode).json({ error: error.message });
    }
  }

  async percentageRatingMeals(req, res) {
    try {
      const ratings = await percentageRatingMealsService.handle();

      return res.status(200).json(ratings);
    } catch (error) {
      return res.status(error.statusCode).json({ error: error.message });
    }
  }

  async percentageGeneralRating(req, res) {
    try {
      const generalRatings = await percentageGeneralRatingService.handle();

      return res.status(200).json(generalRatings);
    } catch (error) {
      return res.status(error.statusCode).json({ error: error.message });
    }
  }

  async countURImprovements(req, res) {
    try {
      const improvements = await countURImprovementsService.handle();

      return res.status(200).json(improvements);
    } catch (error) {
      return res.status(error.statusCode).json({ error: error.message });
    }
  }
}

module.exports = new StudentStatisticsController();
