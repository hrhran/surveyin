const mongoose = require('mongoose')
const { Schema } = mongoose

const userSchema = new Schema({
    googleId: String,
    email: String,
    credits: {
        type: Number,
        default: 0,
    }
})

module.exports = mongoose.model('users', userSchema)