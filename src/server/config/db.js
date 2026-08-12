import mongoose from "mongoose";

let isConnected = false;

export async function connectDB() {
  if (isConnected) return true;

  const mongoUri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/phidim_service";

  try {
    const db = await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 1500,
    });
    isConnected = db.connections[0].readyState === 1;
    if (isConnected) {
      console.log(`[MongoDB] Connected successfully to ${db.connection.host}/${db.connection.name}`);
    }
    return isConnected;
  } catch (error) {
    console.warn(
      `[MongoDB Warning] Could not connect to ${redactUri(mongoUri)} (${error.message}). Falling back to in-memory state. ` +
        `To use a real database, set MONGODB_URI in your .env.local (e.g. MongoDB Atlas) and ensure the server is running.`
    );
    return false;
  }
}

// Hide credentials from log output when printing the connection string.
function redactUri(uri) {
  try {
    const url = new URL(uri);
    if (url.username) url.username = "***";
    if (url.password) url.password = "***";
    return url.toString();
  } catch {
    return uri;
  }
}
