const Contact = require('../models/contactModel');

// @desc    Get contact info
// @route   GET /api/contact
// @access  Public
const getContactInfo = async (req, res) => {
  try {
    const contact = await Contact.findOne();
    if (!contact) {
      return res.status(404).json({ message: 'Contact information not found' });
    }
    res.json(contact);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Update contact info
// @route   PUT /api/contact
// @access  Private/Admin
const updateContactInfo = async (req, res) => {
  const { address, phone, email } = req.body;

  try {
    let contact = await Contact.findOne();

    if (contact) {
      // Update existing contact info
      contact.address = address || contact.address;
      contact.phone = phone || contact.phone;
      contact.email = email || contact.email;
      await contact.save();
    } else {
      // Create new contact info if it doesn't exist
      contact = await Contact.create({ address, phone, email });
    }

    res.json(contact);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { getContactInfo, updateContactInfo };
