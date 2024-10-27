import userRepository from "../repositories/userRepository.js";
import Role from "../models/roleModel.js";

const userService = {
  async getAllUsers() {
    return await userRepository.findAll();
  },

  async getUserById(userId) {
    const user = await userRepository.findById(userId);
    if (!user) throw new Error("User not found");
    return user;
  },

  async createUser(userData) {
    return await userRepository.create(userData);
  },

  async updateUser(userId, updateData) {
    const user = await userRepository.update(userId, updateData);
    if (!user) throw new Error("User not found");
    return user;
  },

  async deleteUser(userId) {
    const deletedUser = await userRepository.delete(userId);
    if (!deletedUser) throw new Error("User not found");
    return deletedUser;
  },

  async assignRolesToUser(userId, roleIds) {
    // Verify if roles exist
    const roles = await Role.find({ _id: { $in: roleIds } });
    if (roles.length !== roleIds.length) {
      throw new Error("Some roles not found");
    }

    return await userRepository.assignRoles(userId, roleIds);
  },
};

export default userService;
