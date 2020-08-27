const studentRespository = require('../../repositories/studentRepository');
const InternalServerError = require('../../utils/errors/internalServerError');

class ListStudentsService {
  async handle(skip, limit) {
    try {
      const students = await studentRespository.lista(skip, limit);
      const total_students = await studentRespository.countStudents();

      return { total_students, students };
    } catch (error) {
      throw new InternalServerError('Internal Server Error');
    }
  }
}

module.exports = new ListStudentsService();
