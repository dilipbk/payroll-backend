import Permission from "../models/permissionModel.js";

const permissionService = {
  async getAllPermissions() {
    return await Permission.find();
  },

  async getPermissionById(id) {
    return await Permission.findById(id);
  },

  async getPermissionByName(name) {
    return await Permission.findOne({ name });
  },

  async createPermission(data) {
    const permission = new Permission(data);
    return await permission.save();
  },

  async updatePermission(id, data) {
    return await Permission.findByIdAndUpdate(id, data, { new: true });
  },

  async deletePermission(id) {
    return await Permission.findByIdAndDelete(id);
  },
};

export default permissionService;
