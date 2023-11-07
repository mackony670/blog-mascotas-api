const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const { body} = require("express-validator");
const validationMiddleware = require("../middleware/validationMiddleware");

const validationRules = [
  // Definir reglas de validación usando express-validator
  body("username")
    .trim()
    .isLength({ min: 5 })
    .withMessage("El nombre de usuario debe tener al menos 5 caracteres")
    .escape(),
  body("email")
    .isEmail()
    .withMessage("Ingrese una dirección de correo electrónico válida")
    .notEmpty()
    .escape(),
  body("password")
    .isLength({ min: 6 })
    .withMessage("La contraseña debe tener al menos 6 caracteres")
    .notEmpty()
    .escape(),
];
router.post(
  "/register",
  validationRules,
  validationMiddleware,
  authController.register
);
router.post(
  "/login",
  validationRules,
  validationMiddleware,
  authController.login
);

module.exports = router;
