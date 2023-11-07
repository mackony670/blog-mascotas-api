const jwt = require('jsonwebtoken');
const {jwtSecretKey}=require("../config/jwt.js")
const generateToken = (pyload) => {
  return jwt.sign(pyload , jwtSecretKey, { expiresIn: '2h' });
};
module.exports = { generateToken };