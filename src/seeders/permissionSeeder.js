// utils/generatePermissions.js
import Permission from "../models/permissionModel.js";
import permissionService from "../services/permissionService.js";

const publicRoutes = ["/api/auth/login", "/api/auth/register"];

export const generatePermissions = async (permissions) => {
  try {
    for (const permission of permissions) {
      const { route, method, name, description = null, slug } = permission; // Assume each route has path and method

      // Check if the route is public
      if (publicRoutes.includes(route)) {
        continue; // Skip public routes
      }

      // Check if permission already exists
      const permissionExists = await permissionService.getPermissionByName(
        name
      );
      if (!permissionExists) {
        // Create permission dynamically
        const newPermission = {
          name,
          slug: slug,
          method,
          route,
          description: description || `Permission for ${method} ${route}`,
        };
        permissionService.createPermission(newPermission);
        console.log(`Permission ${name} created`);
      } else {
        throw Error("Permission already exists");
      }
    }
  } catch (error) {
    console.error("Error generating permissions:", error);
  }
};
