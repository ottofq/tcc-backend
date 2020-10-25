class CacheError extends Error {
  constructor(message) {
    super(message);
    this.name = 'CacheError';
    Error.captureStackTrace(this, CacheError);
  }
}

module.exports = CacheError;
