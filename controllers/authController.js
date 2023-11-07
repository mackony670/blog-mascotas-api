const User = require('../models/user');
const jwtUtils = require('../utils/jwtUtils');
const bcrypt = require('bcrypt');

exports.register = async (req, res) => {
  const { username, email, password } = req.body;
  
  
  try {
    // Verificar si el usuario o el correo ya existen
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(400).json({ error: 'El usuario o el correo electrónico ya están registrados.' });
    }

    // Crear un nuevo usuario
    const newUser = await User.create({ username, email, password });
    
    // Generar token de autenticación
    const pyload = {username,email,_id:newUser._id}
    const token = jwtUtils.generateToken(pyload);

    res.json({ token, user: { username: newUser.username, email: newUser.email } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al registrar el usuario.' });
  }
  
};

exports.login = async (req, res) => {
  const { username, password } = req.body;
  try {
    // Verificar si el usuario existe
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ error: 'Credenciales inválidas.' });
    }

    // Verificar la contraseña
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Credenciales inválidas.' });
    }

    // Generar token de autenticación
    const token = jwtUtils.generateToken({id:user._id,email:user.email,username:user.username});

    res.json({ token, user: { username: user.username, email: user.email } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al iniciar sesión.' });
  }
};