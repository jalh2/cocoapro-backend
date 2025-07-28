const express = require('express');
const router = express.Router();
const {
  getTeamMembers,
  addTeamMember,
  updateTeamMember,
  deleteTeamMember
} = require('../controllers/teamController');

// We can add authentication middleware here later to protect the routes

router.route('/')
  .get(getTeamMembers)
  .post(addTeamMember);

router.route('/:id')
  .put(updateTeamMember)
  .delete(deleteTeamMember);

module.exports = router;
