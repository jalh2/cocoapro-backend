const mongoose = require('mongoose');

const newsPostSchema = new mongoose.Schema({
  text: { type: String, required: true },
  images: { type: [String], required: true },
  postDate: { type: Date, default: Date.now }
}, { timestamps: true });

const NewsPost = mongoose.model('NewsPost', newsPostSchema);

module.exports = NewsPost;
