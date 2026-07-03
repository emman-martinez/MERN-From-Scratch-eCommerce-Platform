import mongoose from 'mongoose';
import { app } from './app.js';
import { env } from './config/env.js';

async function startServer() {
  try {
    await mongoose.connect(env.MONGO_URI);
    console.log('MongoDB connected!');

    app.listen(env.PORT, () => {
      console.log(`Backend running on port ${env.PORT}`);
    });
  } catch (error) {
    console.error('Server error:', error);
    process.exit(1);
  }
}

startServer();
