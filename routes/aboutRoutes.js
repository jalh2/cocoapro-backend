const express = require('express');
const router = express.Router();
const { getAbout, updateAbout, deleteAboutImage } = require('../controllers/aboutController');

// We can add authentication middleware here later to protect the update route

router.route('/').get(getAbout).put(updateAbout);
router.route('/image').delete(deleteAboutImage);

module.exports = router;
