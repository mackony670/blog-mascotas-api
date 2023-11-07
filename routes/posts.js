const express = require('express');
const router = express.Router();
const {createPost,deletePost,getAllPosts,getPostById,updatePost} = require('../controllers/post controller/index');


// Middleware de autorización
const { authenticate, authorize } = require('../middleware/authMiddleware'); 
const { uploadFile } = require('../middleware/multerConfig'); 

//rutas de los posts
router.get('/', getAllPosts);
router.get('/:postId', getPostById);
router.post('/create',authenticate,uploadFile,createPost);
router.put('/:postId',authenticate,updatePost);
router.delete('/:postId', authenticate,deletePost);
module.exports = router;
