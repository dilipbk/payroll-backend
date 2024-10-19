import dotenv from "dotenv";
import app from "./app.js";
import connectDB from "./config/database.js";

const envFile =
  process.env.NODE_ENV === "production" ? ".env.prod" : ".env.local";
dotenv.config({ path: envFile });

// Load environment variables
dotenv.config();

// Connect to the database
connectDB();

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, (req) => {
  console.log(`Server running on port ${PORT}`);
});
