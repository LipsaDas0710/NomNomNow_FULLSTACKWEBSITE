import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('❌ MONGODB_URI not defined in environment');
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export async function connectDB() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    console.log('🌐 Connecting to MongoDB...');
    cached.promise = mongoose.connect(MONGODB_URI);
  }

  try {
    cached.conn = await cached.promise;
    console.log('✅ MongoDB connected!');
    return cached.conn;
  } catch (err) {
    console.error('❌ MongoDB connection error:', err);  // ADD THIS
    throw err;
  }
}
