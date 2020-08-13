const newsRepository = require('../../repositories/newsRepository');

class CreateNewsService {
  async handle(news) {
    try {
      const cleanDescription = news.descricao.replace(/(\r\n|\n|\r)/gm, '');

      const newsCreated = await newsRepository.create({
        titulo: news.titulo,
        descricao: cleanDescription,
      });

      return newsCreated;
    } catch (error) {
      throw Error(error.message);
    }
  }
}

module.exports = new CreateNewsService();
