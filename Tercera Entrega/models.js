const mongoose = require('mongoose');

module.exports = mongoose.model('Users', {
   // username: String,
    password: String,
    email: String,
    firstName: String,
    lastName: String,
    address: String,
    age: Number,
    phone: Number,
    prefix: String,
    urlPhoto: String
});