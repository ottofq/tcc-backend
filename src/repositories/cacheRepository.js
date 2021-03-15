const cache = require('../database/redis');
const CacheError = require('../utils/errors/cacherError');

class Cache {
  async save(key, timestamp, data) {
    try {
      await cache.setex(key, timestamp, data);
    } catch (error) {
      throw new CacheError(error.message);
    }
  }

  async get(id) {
    try {
      const data = cache.get(id);
      return data;
    } catch (error) {
      throw new CacheError(error.message);
    }
  }

  async delete(id) {
    try {
      await cache.del(id);
    } catch (error) {
      throw new CacheError(error.message);
    }
  }
}

module.exports = new Cache();
