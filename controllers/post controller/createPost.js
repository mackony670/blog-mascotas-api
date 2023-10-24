
/**
 * 
const Post = require("../../models/post");
const guardarEnlaDB = async (file,body,userId) =>{
  // Extraer datos del cuerpo de la solicitud
  const { title,
    content,
    category,
    tags,
    status,
  } = body;
  // URL de la imagen subida
  const imageUrl = file ? `/uploads/${file.originalname}` : '';
  // Utilizar el ID del usuario almacenado en req.user como autor del post

  // Crear un nuevo post
  const newPost = new Post({
    title,
    content,
    category,
    tags,
    author: userId,
    imageUrl
  });
  // Guardar el post en la base de datos
  await newPost.save();
  return newPost;
}
module.exports = async (req, res) => {
  try {
    const {file,body,user}=req
    const postSaved = await guardarEnlaDB(file,body,user._id);
    
    res.status(201).json(postSaved);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al crear el post" });
  }
};

 */

const { validationResult } = require('express-validator');
const { check } = require('express-validator');
const Post = require('../../models/post');

// Función para validar la entrada
const validateInput = async (req) => {
  const validationRules = [
    check('title').isString().notEmpty(),
    check('content').isString().notEmpty(),
    check('category').isString().notEmpty(),
    check('tags').isArray(),
    check('status').isString().optional(),
  ];

  await Promise.all(validationRules.map((rule) => rule.run(req)));
  return validationResult(req);
};

// Función para guardar en la base de datos
const guardarEnlaDB = async (file, body, userId) => {
  const { title, content, category, tags, status } = body;
  const errors = validationResult(body);

  if (!errors.isEmpty()) {
    return { error: errors.array() };
  }

  const imageUrl = file ? `/uploads/${file.originalname}` : '';

  const newPost = new Post({
    title,
    content,
    category,
    tags,
    author: userId,
    imageUrl,
    status
  });

  await newPost.save();
  return newPost;
};

module.exports = async (req, res) => {
  try {
    const { file, body, user } = req;
    const validationResult = await validateInput(req);

    if (!validationResult.isEmpty()) {
      return res.status(422).json({ errors: validationResult.array() });
    }

    const postSaved = await guardarEnlaDB(file, body, user._id);
    res.status(201).json(postSaved);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al crear el post" });
  }
};
