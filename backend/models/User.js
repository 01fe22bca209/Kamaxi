const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, match: /^[A-Za-z\s]+$/ },
  email: { type: String, required: true, unique: true, match: /^\S+@\S+\.\S+$/ },
  phone: { type: String, required: true, match: /^[0-9]{10}$/ },
  password: { type: String, required: true }
});

module.exports = mongoose.model('User', userSchema);
