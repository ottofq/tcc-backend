const newsRepository = require('../../repositories/newsRepository');
const InternalServerError = require('../../utils/errors/internalServerError');
const NotFoundError = require('../../utils/errors/notFoundError');

class UpdateNewsService {
  async handle(id, title, description) {
    try {
      const newsExists = await newsRepository.findById(id);

      if (!newsExists) {
        throw Error('News not found');
      }

      const descriptionClear = description.replace(/(\r\n|\n|\r)/gm, '');

      const newsUpdated = await newsRepository.update(id, {
        titulo: title,
        descricao: descriptionClear,
      });

      return newsUpdated;
    } catch (error) {
      if (error.name === 'DBError') {
        throw new InternalServerError('Internal Server Error');
      }
      throw new NotFoundError(error.message);
    }
  }
}

module.exports = new UpdateNewsService();
