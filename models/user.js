const { string } = require('joi');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: string,
        required: true
    },
    role: {
        type: String,
        enum: ['admin', 'driver', 'dispatcher'],
        required: true
    },
    companyName: {
        type: String,
        required: true
    },
    joinCode: String,
});

const User = mongoose.model('User', userSchema);

module.exports = User;