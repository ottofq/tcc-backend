const bcrypt = require('bcrypt');
const { promisify } = require('util');

const hashAsync = promisify(bcrypt.hash);
const compareAsync = promisify(bcrypt.compare);
const saltRounds = parseInt(process.env.SALT, 10);

class PasswordUtil {
  async hashPassword(pass) {
    return hashAsync(pass, saltRounds);
  }

  async comparePassword(pass, hash) {
    return compareAsync(pass, hash);
  }
}

module.exports = new PasswordUtil();
