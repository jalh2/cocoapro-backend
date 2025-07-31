const express = require('express');
const router = express.Router();
const { getNewsPosts, createNewsPost, updateNewsPost, deleteNewsPost, getNewsPostImages } = require('../controllers/newsPostController');

// We can add authentication middleware here later to protect the create and delete routes

router.route('/').get(getNewsPosts).post(createNewsPost);
router.route('/:id').put(updateNewsPost).delete(deleteNewsPost);
router.route('/:id/images').get(getNewsPostImages);

module.exports = router;
