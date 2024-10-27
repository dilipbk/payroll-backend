import roleRepository from "../repositories/roleRepository.js";
import Permission from "../models/permissionModel.js";

const roleService = {
  async getAllRoles() {
    return roleRepository.getAllRoles();
  },

  async getRoleById(roleId) {
    return roleRepository.findRoleById(roleId);
  },

  async createRole(roleData) {
    return roleRepository.createRole(roleData);
  },

  async updateRole(roleId, roleData) {
    return roleRepository.updateRole(roleId, roleData);
  },

  async deleteRole(roleId) {
    return roleRepository.deleteRole(roleId);
  },

  async initializeDefaultRole() {
    const roleName = "Administrator";
    const existingRole = await roleRepository.findRoleByName(roleName);

    if (!existingRole) {
      const defaultRole = {
        name: roleName,
        groups: [], // Assign groups if necessary
      };
      return roleRepository.createRole(defaultRole);
    }
    return existingRole; // Return existing role if found
  },

  async assignPermissionsToRole(roleId, permissionIds) {
    try {
      // Validate permissions
      const permissions = await Permission.find({
        _id: { $in: permissionIds },
      });
      if (permissions.length !== permissionIds.length) {
        throw new Error("Some permissions were not found.");
      }

      // Assign permissions to role
      const updatedRole = await roleRepository.assignPermissions(
        roleId,
        permissionIds
      );
      if (!updatedRole) {
        throw new Error("Role not found.");
      }

      return updatedRole;
    } catch (error) {
      throw new Error(`Failed to assign permissions to role: ${error.message}`);
    }
  },
};

export default roleService;
