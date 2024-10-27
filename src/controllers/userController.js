import User from "../models/userModel.js";
import Role from "../models/roleModel.js";
import userService from "../services/userService.js";

const userController = {
  async getUsers(req, res) {
    try {
      const users = await userService.getAllUsers();

      res.status(200).json(users);
    } catch (err) {
      res.status(500).json({ message: "Something went wrong" });
    }
  },

  async getUser(req, res) {
    const id = req.params.id;
    try {
      const user = await userService.getUserById(id);

      res.status(200).json({ success: true, data: user });
    } catch (err) {
      res.status(500).json({ message: "Something went wrong" });
    }
  },

  async updateUser(req, res) {
    try {
      const updatedUser = await userService.updateUser(req.params.id, req.body);
      if (!updatedUser) {
        return res
          .status(404)
          .json({ success: false, message: "User not found" });
      }
      res.json({
        success: true,
        data: updatedUser,
        message: "User updated successfully",
      });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  },

  async createUser(req, res) {
    try {
      const payload = req.body;
      const result = await userService.createUser(payload);
      res
        .status(201)
        .json({ success: true, message: "User created successfully" });
    } catch (err) {
      console.log("err", err.errmsg);
      res.status(500).json({ message: err.errmsg });
    }
  },

  async deleteUser(req, res) {
    const id = req.params.id;
    try {
      await userService.deleteUser(id);

      res.status(200).json({ message: "Deleted Successfully" });
    } catch (err) {
      res.status(500).json({ message: "Something went wrong" });
    }
  },

  async assignRolesToUser(req, res) {
    const { userId, role_ids } = req.body; // User ID and role names in request

    try {
      // Find roles by name
      const roles = await Role.find({ _id: { $in: role_ids } });

      // Assign roles to user
      const user = await User.findByIdAndUpdate(
        userId,
        { $set: { roles: roles.map((role) => role._id) } }, // Assign multiple roles
        { new: true }
      );

      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error assigning roles to user",
        error,
      });
    }
  },

  async getUserPermissions(req, res) {
    const userId = req.params.userId;
    const permissions = await userService.getUserPermissions(userId);
    res.json({ permissions });
  },
};

export default userController;
