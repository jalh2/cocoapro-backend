const Hero = require('../models/heroModel');

// @desc    Get hero content
// @route   GET /api/hero
// @access  Public
const getHero = async (req, res) => {
  try {
    const hero = await Hero.findOne();
    if (!hero) {
      return res.status(404).json({ message: 'Hero content not found' });
    }
    res.json(hero);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Update hero content
// @route   PUT /api/hero
// @access  Private/Admin
const updateHero = async (req, res) => {
  const { heading, subheading, imageUrl } = req.body;

  try {
    let hero = await Hero.findOne();

    if (hero) {
      // Update existing hero content
      hero.heading = heading || hero.heading;
      hero.subheading = subheading || hero.subheading;
      hero.imageUrl = imageUrl || hero.imageUrl;
      await hero.save();
    } else {
      // Create new hero content if it doesn't exist
      hero = await Hero.create({ heading, subheading, imageUrl });
    }

    res.json(hero);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Delete hero image
// @route   DELETE /api/hero/image
// @access  Private/Admin
const deleteHeroImage = async (req, res) => {
  try {
    const hero = await Hero.findOne();
    
    if (!hero) {
      return res.status(404).json({ message: 'Hero content not found' });
    }
    
    // Remove the image by setting it to a default empty image or placeholder
    hero.imageUrl = '';
    await hero.save();
    
    res.json({ success: true, message: 'Hero image deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { getHero, updateHero, deleteHeroImage };
