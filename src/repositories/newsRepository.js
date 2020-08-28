const newsModel = require('../models/newsModel');
const DBError = require('../utils/errors/dbError');

class NewsRepository {
  async create(news) {
    try {
      const newsCreated = await newsModel.create(news);

      return newsCreated;
    } catch (error) {
      throw new DBError(error.message);
    }
  }

  async list(skip, limit) {
    try {
      const news = await newsModel
        .find()
        .skip(skip)
        .limit(limit)
        .sort({ _id: -1 });
      return news;
    } catch (error) {
      throw new DBError(error.message);
    }
  }

  async findById(id) {
    try {
      const news = await newsModel.findById(id);

      return news;
    } catch (error) {
      throw new DBError(error.message);
    }
  }

  async update(id, news) {
    try {
      const newsUpdated = await newsModel.updateOne(
        { _id: id },
        {
          $set: {
            titulo: news.titulo,
            descricao: news.descricao,
          },
        }
      );

      return newsUpdated;
    } catch (error) {
      throw new DBError(error.message);
    }
  }

  async delete(id) {
    try {
      const result = await newsModel.deleteOne({ _id: id });

      return result;
    } catch (error) {
      throw new DBError(error.message);
    }
  }

  async countNews() {
    try {
      const total_news = await newsModel.countDocuments();

      return total_news;
    } catch (error) {
      throw new DBError(error.message);
    }
  }
}

module.exports = new NewsRepository();
