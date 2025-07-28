const express = require('express');
const router = express.Router();
const { getContactInfo, updateContactInfo } = require('../controllers/contactController');

// We can add authentication middleware here later to protect the update route

router.route('/')
  .get(getContactInfo)
  .put(updateContactInfo);

module.exports = router;
