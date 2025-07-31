const About = require('../models/aboutModel');

// @desc    Get about content
// @route   GET /api/about
// @access  Public
const getAbout = async (req, res) => {
  try {
    const about = await About.findOne();
    if (!about) {
      return res.status(404).json({ message: 'About content not found' });
    }
    res.json(about);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Update about content
// @route   PUT /api/about
// @access  Private/Admin
const updateAbout = async (req, res) => {
  const {
    businessGoal,
    aim,
    vision,
    establishmentAndGrowth,
    liberiasAgriculturalLandscapeAndCPCsRole,
    operationsAndImpact,
    commitmentToLiberiasDevelopment,
    whyLiberia,
    imageUrl
  } = req.body;

  try {
    let about = await About.findOne();

    if (about) {
      // Update existing content
      about.businessGoal = businessGoal || about.businessGoal;
      about.aim = aim || about.aim;
      about.vision = vision || about.vision;
      about.establishmentAndGrowth = establishmentAndGrowth || about.establishmentAndGrowth;
      about.liberiasAgriculturalLandscapeAndCPCsRole = liberiasAgriculturalLandscapeAndCPCsRole || about.liberiasAgriculturalLandscapeAndCPCsRole;
      about.operationsAndImpact = operationsAndImpact || about.operationsAndImpact;
      about.commitmentToLiberiasDevelopment = commitmentToLiberiasDevelopment || about.commitmentToLiberiasDevelopment;
      about.whyLiberia = whyLiberia || about.whyLiberia;
      about.imageUrl = imageUrl || about.imageUrl;
      await about.save();
    } else {
      // Create new content if it doesn't exist
      about = await About.create({ 
        businessGoal, 
        aim, 
        vision, 
        establishmentAndGrowth, 
        liberiasAgriculturalLandscapeAndCPCsRole, 
        operationsAndImpact, 
        commitmentToLiberiasDevelopment, 
        whyLiberia, 
        imageUrl 
      });
    }

    res.json(about);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Delete about image
// @route   DELETE /api/about/image
// @access  Private/Admin
const deleteAboutImage = async (req, res) => {
  try {
    const about = await About.findOne();
    
    if (!about) {
      return res.status(404).json({ message: 'About content not found' });
    }
    
    // Remove the image by setting it to an empty string
    about.imageUrl = '';
    await about.save();
    
    res.json({ success: true, message: 'About image deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { getAbout, updateAbout, deleteAboutImage };
