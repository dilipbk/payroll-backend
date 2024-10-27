import User from "../models/userModel.js";
import bcrypt from "bcryptjs";

const userRepository = {
  async findAll() {
    return await User.find().populate({
      path: "roles",
      select: "name",
    });
  },

  async findById(userId) {
    return await User.findById(userId);
  },

  async create(userData) {
    const saltRounds = 10; // Number of salt rounds for hashing
    const password = userData?.password || "Admin@123"; // Use provided password or default

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const payload = {
      ...userData,
      password: hashedPassword,
    };

    const newUser = new User(payload);
    return await newUser.save();
  },

  async update(userId, updateData) {
    return await User.findByIdAndUpdate(userId, updateData, { new: true });
  },

  async delete(userId) {
    return await User.findByIdAndDelete(userId);
  },

  async assignRoles(userId, roleIds) {
    const user = await User.findById(userId);
    if (!user) throw new Error("User not found");

    user.roles = roleIds;
    return await user.save();
  },
};

export default userRepository;
