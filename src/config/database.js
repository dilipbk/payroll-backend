// src/config/database.js
import mongoose from "mongoose";
import roleSeeder from "../seeders/roleSeeder.js";
import userSeeder from "../seeders/userSeeder.js";
import { generatePermissions } from "../seeders/permissionSeeder.js";
import { permissions_to_seed } from "./permissionConfigs.js";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database connected");
    await roleSeeder();
    await userSeeder.run();
    await generatePermissions(permissions_to_seed);
  } catch (error) {
    console.error("Database connection error", error);
    process.exit(1);
  }
};

export default connectDB;
