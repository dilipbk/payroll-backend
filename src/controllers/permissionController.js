import permissionService from "../services/permissionService.js"; // Import your permission service

const permissionController = {
  async getAllPermissions(req, res) {
    try {
      const permissions = await permissionService.getAllPermissions();
      res.json(permissions);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  async getPermissionById(req, res) {
    try {
      const permission = await permissionService.getPermissionById(
        req.params.id
      );
      if (!permission) {
        return res.status(404).json({ message: "Permission not found" });
      }
      res.json(permission);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  async createPermission(req, res) {
    try {
      const newPermission = await permissionService.createPermission(req.body);
      res.status(201).json(newPermission);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  async updatePermission(req, res) {
    try {
      const updatedPermission = await permissionService.updatePermission(
        req.params.id,
        req.body
      );
      if (!updatedPermission) {
        return res.status(404).json({ message: "Permission not found" });
      }
      res.json(updatedPermission);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  async deletePermission(req, res) {
    try {
      const deletedPermission = await permissionService.deletePermission(
        req.params.id
      );
      if (!deletedPermission) {
        return res.status(404).json({ message: "Permission not found" });
      }
      res.json({ message: "Permission deleted" });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
};

export default permissionController;
