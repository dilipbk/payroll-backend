import mongoose from "mongoose";

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
  full_name: {
    type: String,
    default: function () {
      return `${this.first_name} ${this.last_name}`.trim();
    },
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
  roles: [{ type: mongoose.Schema.Types.ObjectId, ref: "Role" }],
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
  client_group: {
    type: String,
    default: "0",
  },
  company: {
    type: String,
    default: "0",
  },
  location: {
    type: String,
    default: null,
  },
  sub_location: {
    type: String,
    default: null,
  },
  employees: {
    type: String,
    default: null,
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
