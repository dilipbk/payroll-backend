// group.model.js
import mongoose from "mongoose";

const groupSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true }, // E.g., 'Manage Customers'
  slug: { type: String, required: true, unique: true },
  permissions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Permission" }], // Array of permissions
});

const Group = mongoose.model("Group", groupSchema);
export default Group;
