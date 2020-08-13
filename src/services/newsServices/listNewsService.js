const newsRepository = require('../../repositories/newsRepository');

class ListNewsService {
  async handle(skip, limit) {
    try {
      const news = await newsRepository.list(skip, limit);
      const total_news = await newsRepository.countNews();

      return { total_news, news };
    } catch (error) {
      throw Error(error.message);
    }
  }
}

module.exports = new ListNewsService();
