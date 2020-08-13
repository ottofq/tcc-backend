const newsRepository = require('../../repositories/newsRepository');

class DeleteNewsService {
  async handle(id) {
    try {
      const news = await newsRepository.findById(id);

      if (!news) {
        throw Error('news not found');
      }

      const newsDeleted = await newsRepository.delete(id);

      return newsDeleted;
    } catch (error) {
      throw Error(error.message);
    }
  }
}

module.exports = new DeleteNewsService();
