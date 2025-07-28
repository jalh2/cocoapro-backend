const Content = require('../models/contentModel');

// @desc    Get content by section key
// @route   GET /api/content/:sectionKey
// @access  Public
const getContent = async (req, res) => {
  try {
    const content = await Content.findOne({ sectionKey: req.params.sectionKey });
    if (!content) {
      return res.status(404).json({ message: 'Content not found' });
    }
    res.json(content);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Create or update content
// @route   PUT /api/content/:sectionKey
// @access  Private/Admin
const updateContent = async (req, res) => {
  const { sectionKey } = req.params;
  const { title, contentType, contentList, contentParagraph } = req.body;

  try {
    let content = await Content.findOne({ sectionKey });

    if (content) {
      // Update existing content
      content.title = title || content.title;
      content.contentType = contentType || content.contentType;
      content.contentList = contentList || content.contentList;
      content.contentParagraph = contentParagraph || content.contentParagraph;
      await content.save();
    } else {
      // Create new content
      content = await Content.create({ sectionKey, title, contentType, contentList, contentParagraph });
    }

    res.json(content);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { getContent, updateContent };
