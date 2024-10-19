import User from "../models/userModel.js";

export const getUsers = async (req, res) => {
  try {
    const users = await User.find();

    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const createUser = async (req, res) => {
  try {
    const user = {
      username: "johnDilip",
      first_name: "John",
      last_name: "Doe",
      email: "johndoe@example.com",
      email_verified_at: "2024-10-19T14:45:00Z",
      password: "hashedpassword123",
      profile_photo: "https://example.com/photos/johndoe.jpg",
      role: 1,
      is_active: 1,
      contact_no: "1234567890",
      last_login_ip: "192.168.0.1",
    };

    const result = await User.create(user);
    res.status(201).json(result);
  } catch (err) {
    console.log("err", err);
    res.status(500).json({ message: "Something went wrong" });
  }
};
