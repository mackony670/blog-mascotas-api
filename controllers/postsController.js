const Post = require('../models/post');
const {jwtSecretKey} =require('../config/jwt');


exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    //res.json(posts);

    if (posts.title){
      res.json(posts)  
    } 
    else{
      res.json({
                  msg:'no hay posts que mostrar ',
                  quantiti:0
                
                })
    }


  } catch (error) {
    res.status(500).json({ error: 'Error al obtener las publicaciones.' });
  }
};

exports.getPostById = async (req, res) => {
  const { postId } = req.params;
  try {
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ error: 'Publicación no encontrada.' });
    }
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener la publicación.' });
  }
};

exports.createPost = async (req, res) => {
  try {
    // Verificar la existencia del token de autenticación
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({ error: 'No se proporcionó un token de autenticación' });
    }

    // Verificar y decodificar el token
    const decoded = jwt.verify(token, jwtSecretKey); // Reemplaza 'tu_secreto' con tu clave secreta real

    // El token es válido, el usuario está autenticado
    // Asumimos que el ID del usuario está en el token decodificado
    const userId = decoded.userId;

    // Extraer datos del cuerpo de la solicitud
    const { title, content } = req.body;

    // URL de la imagen subida
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

    // Crear un nuevo post
    const newPost = new Post({
      title,
      content,
      imageUrl,
      author: userId, // Utilizamos el ID del usuario autenticado como autor
    });

    // Guardar el post en la base de datos
    const savedPost = await newPost.save();

    res.status(201).json(savedPost);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear el post' });
  }
};

exports.updatePost = async (req, res) => {
  const { postId } = req.params;
  const { title, content } = req.body;

  // Validaciones
  if (!title || !content) {
    return res.status(400).json({ error: 'Se requieren título y contenido para actualizar la publicación.' });
  }

  try {
    const updatedPost = await Post.findByIdAndUpdate(postId, { title, content }, { new: true });
    if (!updatedPost) {
      return res.status(404).json({ error: 'Publicación no encontrada.' });
    }
    res.json(updatedPost);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar la publicación.' });
  }
};

exports.deletePost = async (req, res) => {
  const { postId } = req.params;
  try {
    const deletedPost = await Post.findByIdAndDelete(postId);
    if (!deletedPost) {
      return res.status(404).json({ error: 'Publicación no encontrada.' });
    }
    res.json(deletedPost);
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar la publicación.' });
  }
};
