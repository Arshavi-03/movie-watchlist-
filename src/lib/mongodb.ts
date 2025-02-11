// lib/mongoose.ts
import mongoose from 'mongoose';

if (!process.env.MONGODB_URI) {
    throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

const MONGODB_URI: string = process.env.MONGODB_URI;

interface GlobalMongoose {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
}

declare global {
    var mongoose: GlobalMongoose | undefined;
}

global.mongoose = global.mongoose || { conn: null, promise: null };

async function dbConnect() {
    try {
        if (global.mongoose?.conn) {
            return global.mongoose.conn;
        }

        if (!global.mongoose?.promise) {
            const opts = {
                bufferCommands: true,
                connectTimeoutMS: 30000,
                socketTimeoutMS: 30000,
                serverSelectionTimeoutMS: 30000,
            };

            global.mongoose.promise = mongoose.connect(MONGODB_URI, opts);
        }

        global.mongoose.conn = await global.mongoose.promise;
        return global.mongoose.conn;
    } catch (error) {
        console.error('MongoDB connection error:', error);
        global.mongoose = { conn: null, promise: null }; // Reset on error
        throw error;
    }
}

export default dbConnect;