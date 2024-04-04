const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  avatar: String,
  email: String,
  location: String,
  name: String,
  password: String,
  selectedOption: String,
  username: String,
});

const User = mongoose.model('User', userSchema);

module.exports = User;
