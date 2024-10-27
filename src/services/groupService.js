import Group from "../models/groupModel.js";
import Permission from "../models/permissionModel.js";

const groupService = {
  async getAllPermissionGroups() {
    return await Group.find();
  },

  async getAllPermissionsByGroup() {
    return await Group.find().populate({
      path: "permissions",
    });
  },

  async getPermissionGroupById(id) {
    return await Group.findById(id);
  },

  async getPermissionGroupByName(name) {
    return await Group.findOne({ name });
  },

  async createPermissionGroup(data) {
    const group = new Group(data);
    return await group.save();
  },

  async updatePermissionGroup(id, data) {
    return await Group.findByIdAndUpdate(id, data, { new: true });
  },

  async deletePermissionGroup(id) {
    return await Group.findByIdAndDelete(id);
  },

  async assignPermissionsToGroup(groupId, permissionIds) {
    try {
      const permissions = await Permission.find({
        _id: { $in: permissionIds },
      });

      if (permissions.length !== permissionIds.length) {
        throw new Error("Some permissions were not found.");
      }

      // Update the group with the permissions
      const updatedGroup = await Group.findByIdAndUpdate(
        groupId,
        { $set: { permissions: permissionIds } },
        { new: true } // Return the updated document
      ).populate("permissions"); // Populate to return full permission data

      if (!updatedGroup) {
        throw new Error("Group not found.");
      }

      return updatedGroup;
    } catch (error) {
      throw new Error(
        `Failed to assign permissions to group: ${error.message}`
      );
    }
  },
};

export default groupService;
