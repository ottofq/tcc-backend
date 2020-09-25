const studentRespository = require('../../repositories/studentRepository');
const NotFoundError = require('../../utils/errors/notFoundError');

class UpdateStudentService {
  async handle(student) {
    const studentExists = await studentRespository.findById(student._id);

    if (!studentExists) {
      throw new NotFoundError('Aluno não encotrado');
    }

    await studentRespository.update(student);

    const studentUpdated = await studentRespository.findById(student._id);

    return studentUpdated;
  }
}

module.exports = new UpdateStudentService();
