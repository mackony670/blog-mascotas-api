// middleware/validationMiddleware.js

const { validationResult } = require('express-validator');

const validationMiddleware = (req, res, next) => {
  // Ejecutar las validaciones definidas en las rutas correspondientes
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    // Si hay errores de validación, devolver una respuesta con el código 422 (Unprocessable Entity)
    return res.status(422).json({ errors: errors.array() });
  }

  // Si no hay errores de validación, continuar con la siguiente middleware o el controlador
  next();
};

module.exports = validationMiddleware;
