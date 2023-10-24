const Post = require('../../models/post');
module.exports  = async (req, res) => {
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