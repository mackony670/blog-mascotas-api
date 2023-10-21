const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { query } = require('express-validator');
const validationMiddleware = require('../middleware/validationMiddleware');




router.post('/register', 
[
    // Definir reglas de validación usando express-validator
    query('username').trim().isLength({ min: 5 }).withMessage('El nombre de usuario debe tener al menos 5 caracteres').escape(),
    query('email').isEmail().withMessage('Ingrese una dirección de correo electrónico válida').notEmpty().escape(),
    query('password').isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres').notEmpty().escape(),
  ],
  validationMiddleware,
    authController.register
);
router.post('/login',
[
    query('username').trim().isLength({ min: 5 }).withMessage('El nombre de usuario debe tener al menos 5 caracteres').escape(),
    query('email').isEmail().withMessage('Ingrese una dirección de correo electrónico válida').notEmpty().escape(),
    query('password').isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres').notEmpty().escape(),
  ],
  validationMiddleware, authController.login);

module.exports = router;
