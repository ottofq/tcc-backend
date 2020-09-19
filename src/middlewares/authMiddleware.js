const jwt = require('jsonwebtoken');
const { promisify } = require('util');

module.exports = async (req, res, next) => {
  const auth = req.headers.authorization;

  if (!auth) {
    return res.status(401).json({ error: 'Token não enviado!' });
  }

  const [, token] = auth.split(' ');

  try {
    await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    return next();
  } catch (error) {
    return res
      .status(401)
      .json({ error: error.name, statusCode: 401, message: error.message });
  }
};
