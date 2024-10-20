import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { validationResult } from "express-validator";
import User from "../models/userModel.js";

// Login handler
export const login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { userId: user.id, role: user.role_users_id },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    res.status(200).json({ token });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export const registerUser = async (req, res) => {
  try {
    // Static user data
    const staticUserData = {
      first_name: "Aarav",
      last_name: "Patel",
      username: "dilip",
      email: "dilipbk@gmail.com",
      password: "dilip123",
      profile_photo: "aarav_1702741080.jpg",
      role_users_id: "2",
      is_active: "1",
      contact_no: "9876543210",
      last_login_ip: "2401:4900:1c11:1a12:92e3:36b4:77",
      last_login_date: "2024-08-01 14:32:45",
      remember_token: null,
      allowed_roles: null,
      allow_client_grp: null,
      allow_company: null,
      allow_loc: null,
      allow_sub_loc: null,
      allow_employee: null,
      auto_client_grp: "0",
      auto_company: "0",
      auto_location: "0",
      auto_sub_location: "0",
      otp: "0",
      created_at: new Date(),
      updated_at: new Date(),
      deleted_at: null,
    };

    // Check if the username or email already exists
    const existingUser = await User.findOne({
      $or: [
        { email: staticUserData.email },
        { username: staticUserData.username },
      ],
    });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User already exists with this email or username" });
    }

    // Hash the password before saving
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(staticUserData.password, salt);
    staticUserData.password = hashedPassword; // Set the hashed password

    // Create the new user
    const newUser = new User(staticUserData);

    // Save the user in the database
    await newUser.save();

    // Respond with success message
    return res
      .status(201)
      .json({ message: "User registered successfully", user: newUser });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

// Protect routes middleware
export const protect = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return res.status(401).json({ message: "Not authorized, token missing" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.userId).select("-password");
    next();
  } catch (err) {
    res.status(401).json({ message: "Not authorized, invalid token" });
  }
};

// Authorization middleware
export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role_users_id)) {
      return res
        .status(403)
        .json({ message: "User not authorized for this role" });
    }
    next();
  };
};
