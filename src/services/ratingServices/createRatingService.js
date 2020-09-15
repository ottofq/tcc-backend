const ratingRepository = require('../../repositories/ratingRepository');
const menuRepository = require('../../repositories/menuRepository');
const { findByIdStudentService } = require('../studentServices');
const NotFoundError = require('../../utils/errors/notFoundError');
const InternalServerError = require('../../utils/errors/internalServerError');

class CreateRatingService {
  async handle(menuId, studentId, rating, comments) {
    try {
      const student = await findByIdStudentService.handle(studentId);

      if (!student) {
        throw Error('Student not found');
      }

      const menuExists = await menuRepository.findById(menuId);

      if (!menuExists) {
        throw Error('Menu not found');
      }

      const studentRating = await ratingRepository.findStudentRating(
        menuId,
        studentId
      );

      if (studentRating) {
        await ratingRepository.updateRating(menuId, student, rating, comments);

        return { success: 'Success update rating' };
      }

      await ratingRepository.create(menuId, student, rating, comments);

      return { success: 'Success on create rating' };
    } catch (error) {
      if (error.name === 'DBError') {
        throw new InternalServerError('Internal Server Error');
      }

      throw new NotFoundError(error.message);
    }
  }
}

module.exports = new CreateRatingService();
