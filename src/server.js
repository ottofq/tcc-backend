require('dotenv').config();
require('./database/mongo');
require('./database/redis');
const { errors } = require('celebrate');

const app = require('./app');

app.use(errors());

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`🏃 Running in port ${process.env.PORT}`);
});
