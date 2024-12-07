const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    firebaseId: String,  // Store Firebase UID here
});

const User = mongoose.model('User', userSchema);
module.exports = User;
