const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  telegramId: { type: String, required: true, unique: true },
  username: { type: String },
  firstName: { type: String },
  lastName: { type: String },
  createdAt: { type: Date, default: Date.now },
  lastInteraction: { type: Date, default: Date.now },
  commandCount: { type: Number, default: 0 },
  ban: { type: Boolean, default: false },
  banReason: { type: String }
});

const User = mongoose.model('User', userSchema);
module.exports = User;