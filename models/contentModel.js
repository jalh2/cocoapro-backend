const mongoose = require('mongoose');

const contentSchema = new mongoose.Schema({
  sectionKey: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  contentType: {
    type: String,
    required: true,
    enum: ['list', 'paragraph']
  },
  contentList: {
    type: [String]
  },
  contentParagraph: {
    type: String
  }
}, { timestamps: true });

const Content = mongoose.model('Content', contentSchema);

module.exports = Content;
