import { match } from "path-to-regexp";
import User from "../models/userModel.js";

export const authorize = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const currentPath = req.originalUrl;

    // Fetch user and populate roles with permissions directly
    const user = await User.findById(userId).populate({
      path: "roles",
      populate: {
        path: "permissions",
        select: "route", // Only retrieve the route field
      },
    });

    // Aggregate all permissions from user roles
    const allPermissions = user.roles.flatMap((role) =>
      role.permissions.map((permission) => permission.route)
    );

    // Check if the user has permission for the current path
    const hasPermission = allPermissions.some((permissionRoute) => {
      const routeMatcher = match(permissionRoute, {
        decode: decodeURIComponent,
      });
      return routeMatcher(currentPath);
    });

    if (hasPermission) {
      return next(); // User has the required permission
    }

    // Deny access if no permission found
    return res.status(403).json({ message: "Access Denied" });
  } catch (error) {
    return res.status(500).json({ message: "Authorization Error", error });
  }
};
