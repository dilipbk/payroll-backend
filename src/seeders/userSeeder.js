import userService from "../services/userService.js";

const userSeeder = {
  async run() {
    try {
      const newUser = {
        first_name: "Sandeep",
        last_name: "Lamichhane",
        username: "sandeep",
        email: "sandeep@gmail.com",
        contact_no: "9847382737",
        roles: ["671914f0e10def333a32a45e"],
      };

      const adminUser = await userService.createUser(newUser);
      console.log("Admin user seeded:", adminUser);
    } catch (error) {
      console.log("Error seeding admin user:", error.message);
    }
  },
};

export default userSeeder;
