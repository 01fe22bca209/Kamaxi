const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middleware
app.use(
  cors({
    origin: ['https://kamaxi2-mern-frontend.vercel.app'],
    methods: ['POST', 'GET', 'PUT', 'DELETE'],
    credentials: true,
  })
); // Enable CORS
app.use(express.json()); // Parse incoming JSON requests

// MongoDB connection
const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/mern'; // Use an environment variable for the URI
mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected successfully!'))
  .catch((err) => console.log('Error connecting to MongoDB:', err));

// User Schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  password: { type: String, required: true },
});

const User = mongoose.model('User', userSchema);

// Test route to confirm API is working
app.get('/api', (req, res) => {
  res.json('API is working correctly!');
});

// Create a new user
app.post('/api/users', async (req, res) => {
  const { name, email, phone, password } = req.body;
  try {
    const newUser = new User({ name, email, phone, password });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ message: 'Error saving user', error: error.message });
  }
});

// Get all users
app.get('/api/users', async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ message: 'Error fetching users', error: error.message });
  }
});

// Delete a user
app.delete('/api/users/:id', async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Error deleting user', error: error.message });
  }
});

// Update a user
app.put('/api/users/:id', async (req, res) => {
  const { name, email, phone, password } = req.body;
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { name, email, phone, password },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(400).json({ message: 'Error updating user', error: error.message });
  }
});

// Export the app for Vercel
module.exports = app;
