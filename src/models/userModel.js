// const mongoose = require('mongoose');
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true, lowercase: true },
  first_name: { type: String, required: true },
  last_name: { type: String },
  email: { type: String, required: true, unique: true },
  email_verified_at: { type: Date },
  password: { type: String, required: true },
  profile_photo: { type: String },
  role: { type: Number, required: true },
  is_active: { type: Number, required: true },
  contact_no: { type: String },
  last_login_ip: { type: String },
});

const User = mongoose.model("User", userSchema);

export default User;
