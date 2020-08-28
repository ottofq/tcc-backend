const newsRepository = require('../../repositories/newsRepository');
const InternalServerError = require('../../utils/errors/internalServerError');

class ListNewsService {
  async handle(skip, limit) {
    try {
      const news = await newsRepository.list(skip, limit);
      const total_news = await newsRepository.countNews();

      return { total_news, news };
    } catch (error) {
      throw InternalServerError('Internal Server Error');
    }
  }
}

module.exports = new ListNewsService();
