import mongoose from 'mongoose';

interface Options {
  mongoUrl: string;
  dbName: string;
}

export class MongoDatabase {
  static async connect(options: Options) {
    const { mongoUrl, dbName } = options;

    try {
      await mongoose.connect(mongoUrl, {
        dbName,
      });
      console.log('Connected to MongoDB');
      return true;
    } catch (error) {
      console.error('Error connecting to MongoDB');
      throw error;
    }
  }

  static async disconnect() {
    try {
      await mongoose.disconnect();
      console.log('Disconnected from MongoDB');
      return true;
    } catch (error) {
      console.error('Error disconnecting from MongoDB');
      throw error;
    }
  }
}
