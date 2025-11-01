const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log("Conectado ao MongoDB");
})
.catch((err) => {
  console.error("Erro de conexão: ", err);
});

module.exports = mongoose;
