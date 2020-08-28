const studentRepository = require('../../repositories/studentRepository');
const InternalServerError = require('../../utils/errors/internalServerError');

class PercentageGeneralRatingService {
  async handle() {
    try {
      const generalRatings = await studentRepository.percentageGeneralRating();
      const totalStudents = await studentRepository.countStudents();

      return { total_alunos: totalStudents, totais: generalRatings[0] };
    } catch (error) {
      throw new InternalServerError('Internal Server Error');
    }
  }
}

module.exports = new PercentageGeneralRatingService();
