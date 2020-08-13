const newsRepository = require('../../repositories/newsRepository');

class UpdateNewsService {
  async handle(id, news) {
    try {
      const newsExists = await newsRepository.findById(id);

      if (!newsExists) {
        throw Error('news not found');
      }

      const descriptionClear = news.descricao.replace(/(\r\n|\n|\r)/gm, '');
      const newsUpdated = await newsRepository.update(id, {
        titulo: news.titulo,
        descricao: descriptionClear,
      });

      return newsUpdated;
    } catch (error) {
      throw Error(error.message);
    }
  }
}

module.exports = new UpdateNewsService();
