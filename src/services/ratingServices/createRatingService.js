const ratingRepository = require('../../repositories/ratingRepository');
const { listStudentService } = require('../studentServices');

class CreateRatingService {
  async handle(menuId, studentId, rating, comments) {
    try {
      const student = await listStudentService.handle(studentId);

      if (!student) {
        throw Error('student not found');
      }
      const studentRating = await ratingRepository.findStudentRating(
        menuId,
        studentId
      );

      if (studentRating) {
        await ratingRepository.updateRating(menuId, student, rating, comments);

        return { success: 'success update rating' };
      }

      await ratingRepository.create(menuId, student, rating, comments);

      return { success: 'success create rating' };
    } catch (error) {
      throw Error(error.message);
    }
  }
}

module.exports = new CreateRatingService();
