import groupService from "../services/groupService.js"; // Import your permission service

const permissionController = {
  async getAllPermissionGroups(req, res) {
    try {
      const groups = await groupService.getAllPermissionGroups();
      res.json({ success: true, data: groups });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  },

  async getAllPermissionsByGroup(req, res) {
    try {
      const groups = await groupService.getAllPermissionsByGroup();
      console.log("requested groups...");
      res.json({ success: true, data: groups });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  },

  async getPermissionGroupById(req, res) {
    try {
      const group = await groupService.getPermissionGroupById(req.params.id);
      if (!group) {
        return res.status(404).json({ message: "Group not found" });
      }
      res.json({ success: true, data: group });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  },

  async createPermissionGroup(req, res) {
    try {
      const newGroup = await groupService.createPermissionGroup(req.body);
      res.status(201).json({ success: true, data: newGroup });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  },

  async updatePermissionGroup(req, res) {
    try {
      const updatedGroup = await groupService.updatePermissionGroup(
        req.params.id,
        req.body
      );
      if (!updatedGroup) {
        return res
          .status(404)
          .json({ success: false, message: "Group not found" });
      }
      res.json({ success: true, data: updatedGroup });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  },

  async deletePermissionGroup(req, res) {
    try {
      const deletedPermission = await groupService.deletePermissionGroup(
        req.params.id
      );
      if (!deletedPermission) {
        return res
          .status(404)
          .json({ success: false, message: "Group not found" });
      }
      res.json({
        success: true,
        message: "Group deleted successfully",
        id: deletedPermission?._id,
      });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  },

  async assignPermissions(req, res) {
    const { permissionIds } = req.body;
    const groupId = req.params.id;
    try {
      const updatedGroup = await groupService.assignPermissionsToGroup(
        groupId,
        permissionIds
      );
      res.status(200).json({ success: true, data: updatedGroup });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },
};

export default permissionController;
