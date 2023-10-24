const Post = require('../../models/post');
module.exports = async (req, res) => {
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
  