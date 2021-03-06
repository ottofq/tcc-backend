const studentRespository = require('../../repositories/studentRepository');
const NotFoundError = require('../../utils/errors/notFoundError');
const DBError = require('../../utils/errors/dbError');
const InternalServerError = require('../../utils/errors/internalServerError');

class FindEmailStudentService {
  async handle(email) {
    try {
      const emailHandled = email.trim().toLowerCase();
      const student = await studentRespository.findByEmail(emailHandled);

      return student;
    } catch (error) {
      if (error instanceof DBError) {
        throw new InternalServerError('Internal Server Error');
      }
      throw new NotFoundError(error.message);
    }
  }
}

module.exports = new FindEmailStudentService();
