import express from "express";
import roleController from "../controllers/roleController.js";

const router = express.Router();

router.get("/", roleController.getAllRoles);
router.get("/:id", roleController.getRoleById);
router.post("/", roleController.createRole);
router.patch("/:id", roleController.updateRole);
router.delete("/:id", roleController.deleteRole);
router.patch("/:id/assign-groups", roleController.assignGroupToRole);
router.patch("/:id/assign-permissions", roleController.assignPermissions);

export default router;
