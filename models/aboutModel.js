const mongoose = require('mongoose');

const aboutSchema = new mongoose.Schema({
  businessGoal: { type: String, required: true },
  aim: { type: String, required: true },
  vision: { type: String, required: true },
  establishmentAndGrowth: { type: String, required: true },
  liberiasAgriculturalLandscapeAndCPCsRole: { type: [String], required: true },
  operationsAndImpact: { type: [String], required: true },
  commitmentToLiberiasDevelopment: { type: [String], required: true },
  whyLiberia: { type: [String], required: true },
  imageUrl: { type: String, required: true }
}, { timestamps: true });

const About = mongoose.model('About', aboutSchema);

module.exports = About;
