const newsRepository = require('../../repositories/newsRepository');

class FindNewsService {
  async handle(id) {
    try {
      const news = await newsRepository.findById(id);

      if (!news) {
        throw Error('news not found');
      }

      return news;
    } catch (error) {
      throw Error(error.message);
    }
  }
}

module.exports = new FindNewsService();
