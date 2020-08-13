const studentRespository = require('../../repositories/studentRepository');

class CreateStudentService {
  async handle(student) {
    const menuCreated = await studentRespository.create(student);

    return menuCreated;
  }
}

module.exports = new CreateStudentService();
