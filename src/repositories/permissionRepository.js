import Permission from "../models/permissionModel.js";

const permissionRepository = {
  async findPermissionBySlug(slug) {
    return Permission.findOne({ slug });
  },

  async createPermission(permissionData) {
    const permission = new Permission(permissionData);
    return permission.save();
  },
};

export default permissionRepository;
