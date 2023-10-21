// config/db.js

const mongoose = require('mongoose');

const dbURI = process.env.DB_URY; // Reemplaza con la URL de tu base de datos

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.on('connected', () => {
  console.log('Conectado a la base de datos');
});
mongoose.connection.on('error', (err) => {
  console.error(`Error de conexión a la base de datos: ${err}`);
});
