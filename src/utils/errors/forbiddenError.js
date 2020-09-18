class ForbiddenError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 403;
    this.name = 'ForbiddenError';
    Error.captureStackTrace(this, ForbiddenError);
  }
}

module.exports = ForbiddenError;
