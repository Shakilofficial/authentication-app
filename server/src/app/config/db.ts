import mongoose from 'mongoose';
import config from '.';

export const connectDB = async () => {
  try {
    await mongoose.connect(config.database_uri as string);
    console.log('🗄️  Database connected successfully! ✅');
  } catch (err) {
    console.error('⚠️ Database connection failed! 🚫:', err);
    process.exit(1);
  }
};
