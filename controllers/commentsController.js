const Comment = require('../models/comment');

exports.getAllComments = async (req, res) => {
  try {
    const comments = await Comment.find();
    res.json(comments);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los comentarios.' });
  }
};

exports.getCommentById = async (req, res) => {
  const { commentId } = req.params;
  try {
    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res.status(404).json({ error: 'Comentario no encontrado.' });
    }
    res.json(comment);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el comentario.' });
  }
};

exports.createComment = async (req, res) => {
  const { content, author, post } = req.body;

  // Validaciones
  if (!content || !author || !post) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios.' });
  }

  try {
    const newComment = await Comment.create({ content, author, post });
    res.status(201).json(newComment);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el comentario.' });
  }
};

exports.updateComment = async (req, res) => {
  const { commentId } = req.params;
  const { content } = req.body;

  // Validaciones
  if (!content) {
    return res.status(400).json({ error: 'Se requiere contenido para actualizar el comentario.' });
  }

  try {
    const updatedComment = await Comment.findByIdAndUpdate(commentId, { content }, { new: true });
    if (!updatedComment) {
      return res.status(404).json({ error: 'Comentario no encontrado.' });
    }
    res.json(updatedComment);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el comentario.' });
  }
};

exports.deleteComment = async (req, res) => {
  const { commentId } = req.params;
  try {
    const deletedComment = await Comment.findByIdAndDelete(commentId);
    if (!deletedComment) {
      return res.status(404).json({ error: 'Comentario no encontrado.' });
    }
    res.json(deletedComment);
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el comentario.' });
  }
};
