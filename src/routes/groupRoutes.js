import express from "express";
import groupController from "../controllers/groupController.js";

const router = express.Router();

// Permission routes
router.get("/", groupController.getAllPermissionGroups); // Get all permissions
router.get("/permissions", groupController.getAllPermissionsByGroup);
router.get("/:id", groupController.getPermissionGroupById); // Get permission by ID
router.post("/", groupController.createPermissionGroup); // Create a new permission
router.patch("/:id", groupController.updatePermissionGroup); // Update a permission
router.delete("/:id", groupController.deletePermissionGroup); // Delete a permission
router.post("/:id/assign-permissions", groupController.assignPermissions);

export default router;
