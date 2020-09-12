const createStudentService = require('./createStudentService');
const findByIdStudentService = require('./findByIdStudentService');
const findEmailStudentService = require('./findEmailStudentService');
const findByRegistrationStudentService = require('./findByRegistrationStudentService');
const listStudentsService = require('./listStudentsService');

module.exports = {
  createStudentService,
  findByIdStudentService,
  findEmailStudentService,
  findByRegistrationStudentService,
  listStudentsService,
};
