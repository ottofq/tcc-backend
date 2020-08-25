const studentRepository = require('../../repositories/studentRepository');

class PercentageGeneralRatingService {
  async handle() {
    try {
      const generalRatings = await studentRepository.percentageGeneralRating();
      const totalStudents = await studentRepository.countStudents();

      return { total_alunos: totalStudents, totais: generalRatings[0] };
    } catch (error) {
      throw Error(error.message);
    }
  }
}

module.exports = new PercentageGeneralRatingService();
