require('dotenv').config();
const mongoose = require('mongoose');

const app = require('./app');

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Rodando na porta ${process.env.PORT}`);
});
