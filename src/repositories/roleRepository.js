import Role from "../models/roleModel.js";

const roleRepository = {
  async getAllRoles() {
    return Role.find();
  },
  async findRoleById(roleId) {
    return Role.findById(roleId).populate({
      path: "groups",
      populate: {
        path: "permissions",
      },
    });
  },

  async findByName(roleName) {
    try {
      const role = await Role.findOne({ name: roleName });
      return role; // Returns the found role or null if not found
    } catch (error) {
      throw new Error(`Error finding role by name: ${error.message}`);
    }
  },

  async createRole(roleData) {
    const role = new Role(roleData);
    return role.save();
  },
  async updateRole(roleId, roleData) {
    return Role.findByIdAndUpdate(roleId, roleData, { new: true });
  },

  async deleteRole(roleId) {
    return Role.findByIdAndDelete(roleId);
  },

  async findRoleByName(name) {
    return Role.findOne({ name });
  },

  async assignPermissions(roleId, permissionIds) {
    return await Role.findByIdAndUpdate(
      roleId,
      { $set: { permissions: permissionIds } },
      { new: true }
    ).populate("permissions");
  },
};

export default roleRepository;
