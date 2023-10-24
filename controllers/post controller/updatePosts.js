const Post = require('../../models/post');
module.exports = async (req, res) => {
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
  