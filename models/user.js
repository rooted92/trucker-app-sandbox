const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    // username and password are added by passportLocalMongoose
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
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
    joinCode: {
        type: String,
    }
});

// This will add a username and password field to the schema
userSchema.plugin(passportLocalMongoose);

const User = mongoose.model('User', userSchema);

module.exports = User;