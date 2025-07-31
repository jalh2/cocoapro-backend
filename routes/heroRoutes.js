const express = require('express');
const router = express.Router();
const { getHero, updateHero, deleteHeroImage } = require('../controllers/heroController');

// We can add authentication middleware here later to protect the update route

router.route('/').get(getHero).put(updateHero);
router.route('/image').delete(deleteHeroImage);

module.exports = router;
