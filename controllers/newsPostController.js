const NewsPost = require('../models/newsPostModel');

// @desc    Get all news posts
// @route   GET /api/news-posts
// @access  Public
const getNewsPosts = async (req, res) => {
  try {
        // Exclude the 'images' field to support lazy loading on the frontend
    const newsPosts = await NewsPost.find({}).select('-images').sort({ postDate: -1 });
    res.json(newsPosts);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Create a news post
// @route   POST /api/news-posts
// @access  Private/Admin
const createNewsPost = async (req, res) => {
  const { text, images, postDate } = req.body;

  if (!text || !images || images.length === 0) {
    return res.status(400).json({ message: 'Please provide text and at least one image.' });
  }

  try {
    const newsPost = new NewsPost({
      text,
      images,
      postDate,
    });

    const createdNewsPost = await newsPost.save();
    res.status(201).json(createdNewsPost);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Update a news post
// @route   PUT /api/news-posts/:id
// @access  Private/Admin
const updateNewsPost = async (req, res) => {
  const { text, images, postDate } = req.body;

  if (!text || !images || images.length === 0) {
    return res.status(400).json({ message: 'Please provide text and at least one image.' });
  }

  try {
    const newsPost = await NewsPost.findById(req.params.id);

    if (newsPost) {
      newsPost.text = text;
      newsPost.images = images;
      newsPost.postDate = postDate || newsPost.postDate;

      const updatedNewsPost = await newsPost.save();
      res.json(updatedNewsPost);
    } else {
      res.status(404).json({ message: 'News post not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Delete a news post
// @route   DELETE /api/news-posts/:id
// @access  Private/Admin
const deleteNewsPost = async (req, res) => {
  try {
    const newsPost = await NewsPost.findById(req.params.id);

    if (newsPost) {
      await newsPost.remove();
      res.json({ message: 'News post removed' });
    } else {
      res.status(404).json({ message: 'News post not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};


// @desc    Get images for a single news post
// @route   GET /api/news-posts/:id/images
// @access  Public
const getNewsPostImages = async (req, res) => {
  try {
    const newsPost = await NewsPost.findById(req.params.id).select('images');
    if (!newsPost) {
      return res.status(404).json({ message: 'News post not found' });
    }
    res.json(newsPost.images);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getNewsPosts,
  createNewsPost,
  updateNewsPost,
  deleteNewsPost,
  getNewsPostImages,
};
