#!/usr/bin/env node

const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

const { seedData, connectDB } = require('../seeds/seedData');

const runSeed = async () => {
  console.log('🌱 Starting database seeding process...\n');
  
  try {
    await connectDB();
    await seedData();
    
    console.log('\n✅ Database seeding completed successfully!');
    console.log('🔐 Admin credentials: username=admin, password=admin123');
    console.log('🌐 You can now start your application and access the admin panel at /admin');
    
  } catch (error) {
    console.error('❌ Error during seeding:', error);
    process.exit(1);
  } finally {
    process.exit(0);
  }
};

runSeed();
