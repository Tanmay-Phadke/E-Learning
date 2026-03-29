const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/userModel');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const importData = async () => {
  try {
    await User.deleteMany({ email: 'tanmayadmin@example.com' });

    const adminUser = {
      name: 'TanmayAdmin',
      email: 'tanmayadmin@example.com',
      password: 'admin1234',
      isAdmin: true,
    };

    await User.create(adminUser);

    console.log('Admin User Created!');
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

importData();
