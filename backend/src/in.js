import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import Platform from './models/Platform.js';
import dotenv from 'dotenv';

dotenv.config();

const addPlatformUser = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('MongoDB connected');

    const email = 'platform@admin.com';
    const password = 'admin123'; // Change this as needed
    const hashedPassword = await bcrypt.hash(password, 10);

    const existing = await Platform.findOne({ email });
    if (existing) {
      console.log('Platform user already exists');
      process.exit(0);
    }

    const platform = new Platform({
      email,
      password: hashedPassword,
      role: 'platform'
    });
    await platform.save();
    console.log('Platform user created:', email);
    process.exit(0);
  } catch (err) {
    console.error('Error:', err.message);
    process.exit(1);
  }
};

addPlatformUser();