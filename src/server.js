require('dotenv').config();
require('./database/mongo');
require('./database/redis');
require('express-async-errors');
const { errors } = require('celebrate');

const errorHandling = require('./middlewares/errorHandler');

const app = require('./app');

app.use(errors());
app.use(errorHandling);

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`🏃 Running in port ${process.env.PORT}`);
});
