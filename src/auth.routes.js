const jwt = require('jsonwebtoken');
const { promisify } = require('util');

module.exports = async (req, res, next) => {
  const auth = req.headers.authorization;

  if (!auth) {
    return res.status(401).json({ error: 'Token não enviado!' });
  }

  const [, token] = auth.split(' ');

  try {
    const result = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    console.log(result);

    return next();
  } catch (error) {
    return res.status(401).json({ error: 'Token Inválido!' });
  }
};
