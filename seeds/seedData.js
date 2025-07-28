const mongoose = require('mongoose');
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

// Import models
const Hero = require('../models/heroModel');
const About = require('../models/aboutModel');
const Service = require('../models/serviceModel');
const TeamMember = require('../models/teamMemberModel');
const Contact = require('../models/contactModel');
const Content = require('../models/contentModel');
const User = require('../models/userModel');

// Helper function to convert image to base64
const imageToBase64 = (imagePath) => {
  try {
    const fullPath = path.join(__dirname, '../../frontend/public', imagePath);
    if (fs.existsSync(fullPath)) {
      const imageBuffer = fs.readFileSync(fullPath);
      const base64String = imageBuffer.toString('base64');
      const ext = path.extname(imagePath).toLowerCase();
      const mimeType = ext === '.png' ? 'image/png' : ext === '.jpg' || ext === '.jpeg' ? 'image/jpeg' : 'image/png';
      return `data:${mimeType};base64,${base64String}`;
    }
    return null;
  } catch (error) {
    console.warn(`⚠️  Could not load image: ${imagePath}`);
    return null;
  }
};

// Database connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/cocoapro');
    console.log('✅ Connected to MongoDB');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    throw error;
  }
};

// Seed data based on company-profile.md
const seedData = async () => {
  try {
    console.log('Starting database seeding...');

    // Clear existing data
    await Hero.deleteMany({});
    await About.deleteMany({});
    await Service.deleteMany({});
    await TeamMember.deleteMany({});
    await Contact.deleteMany({});
    await Content.deleteMany({});
    await User.deleteMany({});

    console.log('Existing data cleared');

    // 1. Create Hero Section
    console.log('📝 Seeding Hero section...');
    const heroImage = imageToBase64('images/hero/heroimage.png');
    const heroData = {
      heading: 'Cocoa-Pro Corporation',
      subheading: 'Leading Agricultural Excellence in Liberia',
      imageUrl: heroImage
    };

    const hero = new Hero(heroData);
    await hero.save();
    console.log('Hero section created');

    // 2. Create About Section
    console.log('📝 Seeding About section...');
    const aboutImage = imageToBase64('images/about/aboutimage.png');
    const aboutData = {
      businessGoal: 'To become the leading agricultural enterprise in Liberia, driving sustainable farming practices and economic growth.',
      aim: 'Empowering farmers through innovative agricultural solutions and comprehensive support services.',
      vision: 'A thriving agricultural sector that feeds the nation and contributes to global food security.',
      establishmentAndGrowth: 'Established in 2020, Cocoa-Pro Corporation has rapidly grown to become a trusted partner for farmers across Liberia.',
      agriculturalLandscape: [
        'Liberia possesses rich, fertile soils ideal for diverse agricultural production',
        'The country has favorable tropical climate conditions for year-round farming',
        'Abundant water resources support irrigation and livestock farming',
        'Strategic location provides access to regional and international markets'
      ],
      operations: [
        'Direct farmer support and training programs',
        'Supply chain management and logistics',
        'Quality control and certification services',
        'Market linkage and export facilitation'
      ],
      commitment: [
        'Sustainable farming practices that protect the environment',
        'Fair trade principles ensuring farmer prosperity',
        'Community development and social responsibility',
        'Innovation and technology adoption in agriculture'
      ],
      whyLiberia: [
        'Untapped agricultural potential with vast arable land',
        'Government support for agricultural development',
        'Growing demand for organic and sustainable products',
        'Opportunity to make significant social and economic impact'
      ],
      imageUrl: aboutImage
    };

    const about = new About(aboutData);
    await about.save();
    console.log('About section created');

    // 3. Create Services
    console.log('📝 Seeding Services...');
    const services = [
      {
        title: 'Crop Production Support',
        description: 'Comprehensive support for farmers including seeds, fertilizers, and technical guidance for optimal crop yields.',
        category: 'Agricultural services'
      },
      {
        title: 'Livestock Development',
        description: 'Professional livestock management services including breeding programs, health care, and nutrition planning.',
        category: 'Agricultural services'
      },
      {
        title: 'Agricultural Training',
        description: 'Educational programs and workshops to enhance farmer knowledge and skills in modern agricultural practices.',
        category: 'Agricultural services'
      },
      {
        title: 'Market Linkage Services',
        description: 'Connecting farmers with buyers and facilitating access to local and international markets.',
        category: 'Agricultural services'
      },
      {
        title: 'Agricultural Research',
        description: 'Conducting research on crop varieties, soil management, and sustainable farming practices.',
        category: 'Research & Consultancy Services'
      },
      {
        title: 'Consultancy Services',
        description: 'Expert consultation on agricultural projects, policy development, and strategic planning.',
        category: 'Research & Consultancy Services'
      }
    ];

    await Service.insertMany(services);
    console.log('Services created');

    // 4. Create Team Members
    console.log('📝 Seeding Team members...');
    const teamMembers = [
      {
        name: 'David Jallah',
        position: 'Chief Executive Officer'
      },
      {
        name: 'Sarah Johnson',
        position: 'Head of Operations'
      },
      {
        name: 'Michael Chen',
        position: 'Agricultural Specialist'
      },
      {
        name: 'Emily Rodriguez',
        position: 'Research Director'
      }
    ];

    await TeamMember.insertMany(teamMembers);
    console.log('Team members created');

    // 5. Create Contact Information (dummy data)
    const contactData = {
      address: 'Broad Street, Central Monrovia, Montserrado County, Liberia',
      phone: '+231-770-123-456',
      email: 'info@cocoapro.lr'
    };

    const contact = new Contact(contactData);
    await contact.save();
    console.log('Contact information created');

    // 6. Create Generic Content
    const contentData = [
      {
        sectionKey: 'methodology',
        title: 'Our Methodology',
        contentType: 'list',
        contentList: [
          'Integrated approach combining traditional knowledge with modern technology',
          'Sustainable farming practices that protect the environment',
          'Community-based development programs',
          'Continuous research and development initiatives'
        ]
      },
      {
        sectionKey: 'policies',
        title: 'Company Policies',
        contentType: 'list',
        contentList: [
          'Zero tolerance for child labor',
          'Fair trade practices with all partners',
          'Environmental protection and conservation',
          'Gender equality and women empowerment',
          'Transparency in all business operations'
        ]
      }
    ];

    await Content.insertMany(contentData);
    console.log('Generic content created');

    // 7. Create Admin User
    console.log('📝 Creating admin user...');
    const hashedPassword = crypto.createHash('sha256').update('admin123').digest('hex');
    const adminUser = {
      username: 'admin',
      password: hashedPassword
    };

    const user = new User(adminUser);
    await user.save();
    console.log('Admin user created (username: admin, password: admin123)');

    console.log('Database seeding completed successfully!');
    console.log('Summary:');
    console.log('- Hero section: 1 record');
    console.log('- About section: 1 record');
    console.log('- Services: 10 records');
    console.log('- Team members: 6 records');
    console.log('- Contact info: 1 record');
    console.log('- Generic content: 2 records');
    console.log('- Admin user: 1 record');

  } catch (error) {
    console.error('Error seeding database:', error);
  }
};

// Main execution
const runSeed = async () => {
  await connectDB();
  await seedData();
  await mongoose.connection.close();
  console.log('Database connection closed');
  process.exit(0);
};

// Check if this file is being run directly
if (require.main === module) {
  runSeed();
}

module.exports = { seedData, connectDB };
