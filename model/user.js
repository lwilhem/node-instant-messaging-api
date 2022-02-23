const mongoose = require('mongoose')
var uniqueValidator = require('mongoose-unique-validator');

var userSchema = mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, index:true, unique: true, required: true, uniqueCaseInsensitive:true },
    password: { type: String, required: true }
})

userSchema.plugin(uniqueValidator, { type: 'mongoose-unique-validator' });
module.exports = mongoose.model('User', userSchema)

