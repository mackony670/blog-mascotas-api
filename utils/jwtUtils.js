const jwt = require('jsonwebtoken');
const {jwtSecretKey}=require("../config/jwt.js")
const generateToken = (userId) => {
  return jwt.sign({ userId }, jwtSecretKey, { expiresIn: '15h' });
};

module.exports = { generateToken };
