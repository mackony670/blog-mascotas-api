const express = require('express');
const router = express.Router();
const commentsController = require('../controllers/commentsController');
//aplicando destructurin a comentsController
const {createComment,deleteComment,getAllComments,getCommentById,updateComment} = commentsController

router.get('/', getAllComments);
router.get('/:commentId', getCommentById);
router.post('/', createComment);
router.put('/:commentId', updateComment);
router.delete('/:commentId', deleteComment);

module.exports = router;
