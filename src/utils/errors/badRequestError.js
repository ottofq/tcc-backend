class BadRequestError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 400;
    this.name = 'BadRequestError';
    Error.captureStackTrace(this, BadRequestError);
  }
}

module.exports = BadRequestError;
