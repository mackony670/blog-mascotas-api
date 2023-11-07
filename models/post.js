/*const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now },
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
*/


const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  category: String,
  tags: [String],
  author: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['publicado', 'borrador', 'programado'],
    default: 'borrador',
  },
  imageUrl:{
    type:String,
    required:false
  }
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
