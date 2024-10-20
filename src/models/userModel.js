import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true,
    trim: true,
  },
  last_name: {
    type: String,
    required: true,
    trim: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  email_verified_at: {
    type: Date,
    default: null,
  },
  password: {
    type: String,
    required: true,
  },
  profile_photo: {
    type: String,
    default: null,
  },
  profile_bg: {
    type: String,
    default: null,
  },
  role_users_id: {
    type: String, // Role ID stored as a string like "1"
    required: true,
  },
  is_active: {
    type: String, // Stored as "1" or "0"
    default: "1",
  },
  contact_no: {
    type: String,
    required: true,
    trim: true,
  },
  last_login_ip: {
    type: String,
    default: null,
  },
  last_login_date: {
    type: Date,
    default: null,
  },
  refresh_token: {
    type: String,
    default: null,
  },
  allowed_roles: {
    type: [String],
    default: null,
  },
  allow_client_grp: {
    type: String,
    default: "0",
  },
  allow_company: {
    type: String,
    default: "0",
  },
  allow_loc: {
    type: String,
    default: null,
  },
  allow_sub_loc: {
    type: String,
    default: null,
  },
  allow_employee: {
    type: String,
    default: null,
  },
  auto_client_grp: {
    type: String,
    default: "0",
  },
  auto_company: {
    type: String,
    default: "0",
  },
  auto_location: {
    type: String,
    default: "0",
  },
  auto_sub_location: {
    type: String,
    default: "0",
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
  deleted_at: {
    type: Date,
    default: null,
  },
});

const User = mongoose.model("User", userSchema);
export default User;
