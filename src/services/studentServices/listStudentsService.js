const studentRespository = require('../../repositories/studentRepository');

class ListStudentsService {
  async handle(skip, limit) {
    const students = await studentRespository.list(skip, limit);
    const total_students = await studentRespository.countStudents();

    return { total_students, students };
  }
}

module.exports = new ListStudentsService();
