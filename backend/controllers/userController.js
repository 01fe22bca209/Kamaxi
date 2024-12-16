const User = require("../models/User");

// Controller to add a new user
const createUser = async (req, res) => {
  const { name, email, phone, password } = req.body;
  try {
    const newUser = new User({ name, email, phone, password });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ message: "Error creating user", error });
  }
};

// Controller to get all users
const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users", error });
  }
};

// Controller to update user
const updateUser = async (req, res) => {
  const { name, email, phone, password } = req.body;
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { name, email, phone, password },
      { new: true }
    );
    res.json(updatedUser);
  } catch (error) {
    res.status(400).json({ message: "Error updating user", error });
  }
};

// Controller to delete user
const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(204).json({ message: "User deleted" });
  } catch (error) {
    res.status(400).json({ message: "Error deleting user", error });
  }
};

module.exports = {
  createUser,
  getUsers,
  updateUser,
  deleteUser,
};
