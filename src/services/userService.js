// src/services/userService.js
const userRepository = require("../repositories/userRepository");

exports.findUserById = (id) => {
  return userRepository.findUserById(id);
};

exports.createUser = (userData) => {
  // Add any business logic, validation, or transformations before saving
  return userRepository.createUser(userData);
};
