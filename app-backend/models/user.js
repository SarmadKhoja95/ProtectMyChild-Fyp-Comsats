const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//creating User Schema
const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
  },
  profilePicture: {
    type: String,
    default: null
  },
  city: {
    type: String,
    default: ''
  }
}, { timestamps: true });

const User = mongoose.model('user', UserSchema);

module.exports = User;