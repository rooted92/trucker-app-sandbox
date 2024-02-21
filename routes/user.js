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

router.get('/signup', (req, res, next) => {
    res.render('users/signup.ejs');
});

router.get('/login', (req, res, next) => {
    res.render('users/login.ejs');
});

router.post('/signup', validateSchema(userSchema), wrapAsync(async (req, res, next) => {
    try {
        let { username, email, phone, role, companyName, joinCode, password } = req.body;
        if (role === 'admin') {
            joinCode = joinCodeHandler();
        }
        const user = new User({ username, email, phone, role, companyName, joinCode });
        const registeredUser = await User.register(user, password);
        console.log(registeredUser);
        req.flash('success', `Welcome to LunaLink! ${registeredUser.role === 'admin' ? `Your Join Code is: ${registeredUser.joinCode}. Please share this code with your team so they can join your organization on Luna Link.` : ''}`);
        res.redirect('/users/login');
    } catch (e) {
        req.flash('error', e.message);
        res.redirect('/users/signup');
    }
}));

router.get('/account', (req, res, next) => {
    res.render('users/account.ejs')
});

router.get('/dashboard', (req, res, next) => {
    res.render('users/dashboard.ejs');
});

module.exports = router;