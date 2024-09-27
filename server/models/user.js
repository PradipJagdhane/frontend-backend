const mongoose = require('mongoose');

// Define user schema
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 100
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/^\S+@\S+\.\S+$/, 'Invalid email format']
  },
  password: {
    type: String,
    required: true,
    minLength: 6
  },

  role: {
    type: String,
    require: true,
  }
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);
