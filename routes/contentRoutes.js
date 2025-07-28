const express = require('express');
const router = express.Router();
const { getContent, updateContent } = require('../controllers/contentController');

// We can add authentication middleware here later to protect the update route

router.route('/:sectionKey')
  .get(getContent)
  .put(updateContent);

module.exports = router;
