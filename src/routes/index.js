import express from "express";
import roleRoutes from "./roleRoutes.js";
import permissionRoutes from "./permissionRoutes.js";
import groupRoutes from "./groupRoutes.js";
import userRoutes from "./userRoutes.js";

const router = express.Router();

router.use("/roles", roleRoutes); // Mount role routes
router.use("/permissions", permissionRoutes); // Mount permission routes
router.use("/permission-group", groupRoutes);
router.use("/users", userRoutes);

export default router;
