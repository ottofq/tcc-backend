const newsRepository = require('../../repositories/newsRepository');
const InternalServerError = require('../../utils/errors/internalServerError');

class CreateNewsService {
  async handle(title, description) {
    try {
      const cleanDescription = description.replace(/(\r\n|\n|\r)/gm, '');

      const newsCreated = await newsRepository.create({
        titulo: title,
        descricao: cleanDescription,
      });

      return newsCreated;
    } catch (error) {
      throw new InternalServerError('Internal Server Error');
    }
  }
}

module.exports = new CreateNewsService();
