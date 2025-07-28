const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['Agricultural services', 'Research & Consultancy Services']
  },
  imageUrl: {
    type: String,
    required: false // Making this optional as it's not in the profile
  }
}, { timestamps: true });

const Service = mongoose.model('Service', serviceSchema);

module.exports = Service;
