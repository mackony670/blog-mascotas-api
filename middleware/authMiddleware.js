// middleware/auth.js

const jwtSecretKey=require("../config/jwt")
const jwt = require('jsonwebtoken');

exports.authenticate = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: 'No se proporcionó un token de autenticación' });
  }

  try {
    const decoded = jwt.verify(token, jwtSecretKey); // Reemplaza 'tu_secreto' con tu clave secreta real
    req.user = {
      _id: decoded.userId,
    };
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ error: 'Token inválido' });
  }
};

exports.authorize = (req, res, next) => {
  // Verifica si el usuario tiene los permisos adecuados
  if (req.user && req.user.role === 'admin') {
    // El usuario tiene permisos de administrador, permite la solicitud
    next();
  } else {
    // El usuario no tiene permisos, responde con un error de autorización
    return res.status(403).json({ error: 'No tienes permisos para realizar esta acción' });
  }
};

