const express = require('express');
const mongoose = require('mongoose');
//const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const postRoutes = require('./routes/posts');
const commentsRoutes = require('./routes/comments');

require('dotenv').config();
require("./config/db.js");


const app = express();
const port = process.env.PORT || 3000;



//app.use(bodyParser.json());
app.use(express.json());
//aplicando las rutas 
app.use('/auth', authRoutes);
app.use('/posts', postRoutes);
app.use('/comments', commentsRoutes);

app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});
