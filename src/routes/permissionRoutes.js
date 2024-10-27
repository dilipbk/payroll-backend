import express from "express";
import permissionController from "../controllers/permissionController.js";

const router = express.Router();

// Permission routes
router.get("/", permissionController.getAllPermissions); // Get all permissions
router.get("/:id", permissionController.getPermissionById); // Get permission by ID

export default router;
