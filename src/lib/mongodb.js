import mongoose from 'mongoose';

// Import all models
import './models/Category';
import './models/Post';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI && process.env.NODE_ENV !== 'test' && process.env.NODE_ENV !== 'production') {
  throw new Error('Please define the MONGODB_URI environment variable inside .env');
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectDB() {
  // Skip DB connection during build or if explicitly disabled
  if (process.env.SKIP_DB_CONNECTION === 'true' || process.env.NEXT_PHASE === 'build') {
    console.log('Skipping DB connection');
    return null;
  }

  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      serverSelectionTimeoutMS: 5000, // Timeout after 5 seconds
    };

    try {
      cached.promise = mongoose.connect(MONGODB_URI || 'mongodb://127.0.0.1:27017/nomad_test', opts)
        .then((mongoose) => {
          return mongoose;
        })
        .catch((err) => {
          console.warn('MongoDB connection error:', err.message);
          return null;
        });
    } catch (e) {
      console.warn('MongoDB connection error:', e.message);
      cached.promise = null;
      return null;
    }
  }

  try {
    cached.conn = await cached.promise;
    return cached.conn;
  } catch (e) {
    console.warn('MongoDB connection error:', e.message);
    cached.promise = null;
    return null;
  }
}

export default connectDB; 