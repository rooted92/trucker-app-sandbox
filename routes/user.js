const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const validateSchema = require('../utilities/validateSchema.js');
const wrapAsync = require('../utilities/wrapAsync.js');
const flash = require('connect-flash');
const { userSchema } = require('../schemas.js');
const session = require('express-session');
const joinCodeHandler = require('../utilities/joinCodeHandler.js');

// Set up session


const User = require('../models/user');

// Testing user creation
router.get('/createuser', async (req, res) => {
    const user = new User({username: 'Peter-roni', email: 'peteroach@gmail.com', phone: '1234567890', role: 'admin', companyName: 'LunaLink'});
    // Wil use register method to hash the password. This method comes from passportLocalMongoose. We are using a hardcoded password for now. Later the password will come from the form.
    const newUser = await User.register(user, 'password');
    res.send(newUser);
});

router.get('/signup', (req, res, next) => {
    res.render('users/signup.ejs');
});

router.get('/login', (req, res, next) => {
    res.render('users/login.ejs');
});

router.post('/signup', validateSchema(userSchema), wrapAsync(async (req, res, next) => {
    const { username, email, phone, role, companyName, password } = req.body;
    if(role === 'admin') {
        // If the user is an admin, we will generate a join code for them
        const user = new User({ username, email, phone, role, companyName, joinCode: joinCodeHandler()});
    } else {
        // If the user is not an admin, we will not generate a join code for them, but require them to enter a join code. The join code will be used to join the company and it will be stored in the admin's user document. This creates an association between the admin and the user. Each admin will represent one company, and each user will belong to one company. The join code will be used to create this association.
        const user = new User({ username, email, phone, role, companyName, joinCode});
    }
    const newUser = await User.register(user, password);
    req.flash('success', 'Welcome to LunaLink!');
    res.redirect('/dashboard');
}));

router.get('/account', (req, res, next) => {
    res.render('users/account.ejs')
});

router.get('/dashboard', (req, res, next) => {
    res.render('users/dashboard.ejs');
});

module.exports = router;