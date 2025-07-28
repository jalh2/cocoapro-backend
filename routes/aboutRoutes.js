const express = require('express');
const router = express.Router();
const { getAbout, updateAbout } = require('../controllers/aboutController');

// We can add authentication middleware here later to protect the update route

router.route('/').get(getAbout).put(updateAbout);

module.exports = router;
