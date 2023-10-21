const express = require('express');
const router = express.Router();
const postsController = require('../controllers/postsController');


// Middleware de autorización
const { authenticate, authorize } = require('../middleware/authMiddleware'); // Asume que ya tienes middleware para autenticación y autorización

router.get('/', postsController.getAllPosts);
router.get('/:postId', postsController.getPostById);
router.post('/',authenticate, postsController.createPost);
router.put('/:postId',authenticate, postsController.updatePost);
router.delete('/:postId', authenticate,postsController.deletePost);

module.exports = router;
