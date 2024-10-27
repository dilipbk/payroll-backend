import Role from "../models/roleModel.js";

async function roleSeeder() {
  const roleName = "Test";

  const existingRole = await Role.findOne({ name: roleName });

  if (!existingRole) {
    const role = new Role({
      name: roleName,
      groups: ["6719dfe87d2ea9619327f242"],
    });

    await role.save();
    console.log("Administrator role seeded");
  } else {
    console.log("Administrator role already exists");
  }
}

export default roleSeeder;
