require('dotenv').config();
require('./database/mongo');
require('./database/redis');

const app = require('./app');

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Rodando na porta ${process.env.PORT}`);
});
