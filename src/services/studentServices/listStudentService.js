const studentRespository = require('../../repositories/studentRepository');

class ListStudentService {
  async handle(id) {
    try {
      const student = await studentRespository.findById(id);

      return student;
    } catch (error) {
      throw Error(error.message);
    }
  }
}

module.exports = new ListStudentService();
