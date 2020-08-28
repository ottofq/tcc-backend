const newsRepository = require('../../repositories/newsRepository');
const InternalServerError = require('../../utils/errors/internalServerError');
const NotFoundError = require('../../utils/errors/notFoundError');

class FindNewsService {
  async handle(id) {
    try {
      const news = await newsRepository.findById(id);

      if (!news) {
        throw Error('News not found');
      }

      return news;
    } catch (error) {
      if (error.name === 'DBError') {
        throw new InternalServerError('Internal Server Error');
      }
      throw new NotFoundError(error.message);
    }
  }
}

module.exports = new FindNewsService();
