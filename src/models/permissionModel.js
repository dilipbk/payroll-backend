// models/permission.js

import mongoose from "mongoose";

const permissionSchema = new mongoose.Schema({
  slug: { type: String, required: true }, // e.g., /users
  name: { type: String, required: true, unique: true }, // e.g., GET_users
  route: { type: String, required: true },
  method: { type: String, required: true },
  description: { type: String },
});

const Permission = mongoose.model("Permission", permissionSchema);
export default Permission;
