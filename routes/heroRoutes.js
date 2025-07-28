const express = require('express');
const router = express.Router();
const { getHero, updateHero } = require('../controllers/heroController');

// We can add authentication middleware here later to protect the update route

router.route('/').get(getHero).put(updateHero);

module.exports = router;
