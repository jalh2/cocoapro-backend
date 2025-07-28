const TeamMember = require('../models/teamMemberModel');

// @desc    Get all team members
// @route   GET /api/team
// @access  Public
const getTeamMembers = async (req, res) => {
  try {
    const teamMembers = await TeamMember.find({});
    res.json(teamMembers);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Create a team member
// @route   POST /api/team
// @access  Private/Admin
const addTeamMember = async (req, res) => {
  const { name, position, imageUrl } = req.body;

  try {
    const teamMember = new TeamMember({
      name,
      position,
      imageUrl,
    });

    const createdTeamMember = await teamMember.save();
    res.status(201).json(createdTeamMember);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Update a team member
// @route   PUT /api/team/:id
// @access  Private/Admin
const updateTeamMember = async (req, res) => {
  const { name, position, imageUrl } = req.body;

  try {
    const teamMember = await TeamMember.findById(req.params.id);

    if (teamMember) {
      teamMember.name = name || teamMember.name;
      teamMember.position = position || teamMember.position;
      teamMember.imageUrl = imageUrl || teamMember.imageUrl;

      const updatedTeamMember = await teamMember.save();
      res.json(updatedTeamMember);
    } else {
      res.status(404).json({ message: 'Team member not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Delete a team member
// @route   DELETE /api/team/:id
// @access  Private/Admin
const deleteTeamMember = async (req, res) => {
  try {
    const teamMember = await TeamMember.findById(req.params.id);

    if (teamMember) {
      await teamMember.remove();
      res.json({ message: 'Team member removed' });
    } else {
      res.status(404).json({ message: 'Team member not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { getTeamMembers, addTeamMember, updateTeamMember, deleteTeamMember };
