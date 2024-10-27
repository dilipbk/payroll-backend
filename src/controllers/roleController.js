import Role from "../models/roleModel.js";
import Group from "../models/groupModel.js";
import roleService from "../services/roleService.js"; // Import your role service

const roleController = {
  async getAllRoles(req, res) {
    try {
      const roles = await roleService.getAllRoles();
      res.json({ success: true, data: roles });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  },

  async getRoleById(req, res) {
    try {
      const role = await roleService.getRoleById(req.params.id);
      if (!role) {
        return res
          .status(404)
          .json({ success: false, message: "Role not found" });
      }
      res.json({ success: true, data: role });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  },

  async createRole(req, res) {
    try {
      const newRole = await roleService.createRole(req.body);
      res.status(201).json({
        success: true,
        message: "Role Created Successfully",
        data: newRole,
      });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  },

  async updateRole(req, res) {
    try {
      const updatedRole = await roleService.updateRole(req.params.id, req.body);
      if (!updatedRole) {
        return res
          .status(404)
          .json({ success: false, message: "Role not found" });
      }
      res.json({
        success: true,
        data: updatedRole,
        message: "Role updated successfully",
      });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  },

  async deleteRole(req, res) {
    try {
      const deletedRole = await roleService.deleteRole(req.params.id);
      if (!deletedRole) {
        return res.status(404).json({ message: "Role not found" });
      }
      res.json({ success: true, message: "Role deleted" });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  },

  async assignPermissions(req, res) {
    const { roleId, permissionIds } = req.body;

    try {
      const updatedRole = await roleService.assignPermissionsToRole(
        roleId,
        permissionIds
      );
      res.status(200).json(updatedRole);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  async assignGroupToRole(req, res) {
    const { group_slugs } = req.body; // Role name and group names to assign
    const role_id = req.params.id;

    try {
      // Find groups by name
      const groups = await Group.find({ slug: { $in: group_slugs } });

      // Find the role and update with the found groups
      // const role = await Role.findOneAndUpdate(
      //   { name: role_name },
      //   { $push: { groups: { $each: groups.map((g) => g._id) } } },
      //   { new: true }
      // );

      await Role.findByIdAndUpdate(role_id, {
        $push: { groups: { $each: groups.map((g) => g._id) } },
      });

      res
        .status(200)
        .json({ success: true, message: "Group Assigned Successfully" });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error assigning group to role",
        error,
      });
    }
  },
};

export default roleController;
