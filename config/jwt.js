// config/jwt.js
require('dotenv').config();
const secret = process.env.SECRET_KEY;
module.exports = {
  jwtSecretKey: secret, // Reemplaza con una clave secreta fuerte
  };
  