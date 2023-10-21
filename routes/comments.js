const express = require('express');
const router = express.Router();
const commentsController = require('../controllers/commentsController');

router.get('/', commentsController.getAllComments);
router.get('/:commentId', commentsController.getCommentById);
router.post('/', commentsController.createComment);
router.put('/:commentId', commentsController.updateComment);
router.delete('/:commentId', commentsController.deleteComment);

module.exports = router;
