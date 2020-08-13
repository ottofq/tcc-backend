const studentModel = require('../models/studentModel');

class StudentRepository {
  async create(student) {
    try {
      const studentCreated = await studentModel.create(student);
      return studentCreated;
    } catch (error) {
      throw Error(error.message);
    }
  }

  async findById(id) {
    try {
      const student = await studentModel.findById(id);
      return student;
    } catch (error) {
      throw Error(error.message);
    }
  }

  async list(skip, limit) {
    try {
      const students = await studentModel
        .find()
        .skip(skip)
        .limit(limit)
        .sort({ _id: -1 });

      return students;
    } catch (error) {
      throw Error(error.message);
    }
  }

  async countStudents() {
    try {
      const total_students = await studentModel.countDocuments();

      return total_students;
    } catch (error) {
      throw Error(error.message);
    }
  }
}

module.exports = new StudentRepository();
