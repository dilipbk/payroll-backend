import Group from "../models/groupModel.js";

const groupRepository = {
  async findGroupById(groupId) {
    return Group.findById(groupId).populate("permissions");
  },

  async createGroup(groupData) {
    const group = new Group(groupData);
    return group.save();
  },
};

export default groupRepository;
