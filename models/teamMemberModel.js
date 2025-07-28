const mongoose = require('mongoose');

const teamMemberSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  position: {
    type: String,
    required: true,
    trim: true
  },
  imageUrl: {
    type: String,
    required: false
  }
}, { timestamps: true });

const TeamMember = mongoose.model('TeamMember', teamMemberSchema);

module.exports = TeamMember;
