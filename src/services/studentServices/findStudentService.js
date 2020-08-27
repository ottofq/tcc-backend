const studentRespository = require('../../repositories/studentRepository');
const NotFoundError = require('../../utils/errors/notFoundError');
const DBError = require('../../utils/errors/dbError');
const InternalServerError = require('../../utils/errors/internalServerError');

class FindStudentService {
  async handle(id) {
    try {
      const student = await studentRespository.findById(id);

      if (!student) {
        throw Error('Student not found');
      }

      return student;
    } catch (error) {
      if (error instanceof DBError) {
        throw new InternalServerError('Internal Server Error');
      }
      throw new NotFoundError(error.message);
    }
  }
}

module.exports = new FindStudentService();
