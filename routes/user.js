const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const validateSchema = require('../utilities/validateSchema.js');
const wrapAsync = require('../utilities/wrapAsync.js');
const flash = require('connect-flash');
const { userSchema } = require('../schemas.js');
const session = require('express-session');
const joinCodeHandler = require('../public/js/joinCodeHandler.js');

const User = require('../models/user');

router.get('/signup', (req, res, next) => {
    res.render('users/signup.ejs');
});

router.get('/login', (req, res, next) => {
    res.render('users/login.ejs');
});

router.post('/signup', validateSchema(userSchema), wrapAsync(async (req, res, next) => {
    let user;
    const { username, password, email, phone, role, companyName, joinCode } = req.body;
    if(role === 'admin') user = new User({ username, password, email, phone, role, companyName });
    else user = new User({ username, password, email, phone, role, companyName, joinCode });
    const registeredUser = await User.register(user, password);
    req.login(registeredUser, err => {
        if(err) return next(err);
        req.flash('success', 'Welcome to LunaLink!');
        res.redirect('/users/login');
    });
    await user.save();
    req.flash('success', 'Welcome to LunaLink!');
    res.redirect('/users/login');
}));

router.get('/account', (req, res, next) => {
    res.render('users/account.ejs')
});

router.get('/dashboard', (req, res, next) => {
    res.render('users/dashboard.ejs');
});

module.exports = router;