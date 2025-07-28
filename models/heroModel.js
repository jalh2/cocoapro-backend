const mongoose = require('mongoose');

const heroSchema = new mongoose.Schema({
  heading: {
    type: String,
    required: true,
    trim: true
  },
  subheading: {
    type: String,
    required: true,
    trim: true
  },
  imageUrl: {
    type: String,
    required: true
  }
}, { timestamps: true });

const Hero = mongoose.model('Hero', heroSchema);

module.exports = Hero;
