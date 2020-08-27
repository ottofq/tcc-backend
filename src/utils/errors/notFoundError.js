class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 404;
    this.name = 'NotFoundError';
    Error.captureStackTrace(this, NotFoundError);
  }
}

module.exports = NotFoundError;
