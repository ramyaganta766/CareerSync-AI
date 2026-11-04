import mongoose from "mongoose";

const connectDB = async () => {
  const envUri = process.env.MONGO_URI;

  // 1. If explicit Atlas or custom connection string is provided, attempt connection
  if (envUri && !envUri.includes("127.0.0.1") && !envUri.includes("localhost")) {
    try {
      const conn = await mongoose.connect(envUri, { serverSelectionTimeoutMS: 5000 });
      console.log(` MongoDB Atlas Connected: ${conn.connection.host}`);
      return conn;
    } catch (err) {
      console.warn(` MongoDB Atlas connection failed: ${err.message}`);
      console.log(" Falling back to local/in-memory instance...");
    }
  }

  // 2. Try standard local MongoDB
  try {
    const localUri = envUri || "mongodb://127.0.0.1:27017/careersync";
    const conn = await mongoose.connect(localUri, { serverSelectionTimeoutMS: 2000 });
    console.log(` Local MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (localErr) {
    // 3. Fallback to MongoMemoryServer for instant local testing without setup blockers
    try {
      console.log(" Starting in-memory MongoDB engine for testing...");
      const { MongoMemoryServer } = await import("mongodb-memory-server");
      const mongod = await MongoMemoryServer.create();
      const uri = mongod.getUri();
      const conn = await mongoose.connect(uri);
      console.log(` In-Memory MongoDB Running & Connected: ${conn.connection.host}`);
      console.log(" NOTE: When ready, replace MONGO_URI in backend/.env with your MongoDB Atlas connection string.");
      return conn;
    } catch (memErr) {
      console.error(`MongoDB setup error: ${memErr.message}`);
      console.log("Please install MongoDB locally or configure MONGO_URI in backend/.env.");
    }
  }
};

export default connectDB;
