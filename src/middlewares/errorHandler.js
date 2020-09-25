module.exports = async (err, req, res, next) => {
  if (err) {
    console.error(err);
    return res
      .status(500)
      .json({ message: 'Internal Server Error', statusCode: 500 });
  }
  return next();
};
