class UnauthorizedError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 401;
    this.name = 'UnauthorizedError';
    Error.captureStackTrace(this, UnauthorizedError);
  }
}

module.exports = UnauthorizedError;
