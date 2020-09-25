const studentRespository = require('../../repositories/studentRepository');
const NotFoundError = require('../../utils/errors/notFoundError');
const DBError = require('../../utils/errors/dbError');
const InternalServerError = require('../../utils/errors/internalServerError');

class FindByRegistrationStudentService {
  async handle(registration) {
    try {
      const student = await studentRespository.findByRegistration(registration);

      return student;
    } catch (error) {
      if (error instanceof DBError) {
        throw new InternalServerError('Internal Server Error');
      }
      throw new NotFoundError(error.message);
    }
  }
}

module.exports = new FindByRegistrationStudentService();
