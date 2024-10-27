// role.model.js
import mongoose from "mongoose";

const roleSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true }, // E.g., 'admin', 'user'
    permissions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Permission" }], // Array of permissions
    description: {
      type: String,
    },
  },
  { timestamps: true }
);

roleSchema.pre("save", async function (next) {
  const roleName = "Administrator";
  if (this.name === roleName) {
    const existingRole = await this.constructor.findOne({ name: roleName });
    if (existingRole && existingRole._id.toString() !== this._id.toString()) {
      throw new Error("Administrator role already exists");
    }
  }
  next();
});

const Role = mongoose.model("Role", roleSchema);
export default Role;
