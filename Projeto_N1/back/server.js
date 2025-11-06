const express = require('express');
const cors = require('cors');
const mongoose = require('./mongoose');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/post');
const commentRoutes = require('./routes/comments');

app.use('/users', userRoutes);
app.use('/posts', postRoutes);
app.use('/comments', commentRoutes);


app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

