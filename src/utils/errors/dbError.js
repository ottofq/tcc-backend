class DBError extends Error {
  constructor(message) {
    super(message);
    this.name = 'DBError';
    Error.captureStackTrace(this, DBError);
  }
}

module.exports = DBError;
