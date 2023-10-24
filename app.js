const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const postRoutes = require('./routes/posts');
const commentsRoutes = require('./routes/comments');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

require('dotenv').config();
require("./config/db.js");

const port = process.env.PORT;
// Configurar una ruta para acceder a las imágenes cargadas
app.use('/uploads', express.static(__dirname + '/uploads'));
//aplicando las rutas 
app.use('/auth', authRoutes);
app.use('/posts', postRoutes);
app.use('/comments', commentsRoutes);

app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});