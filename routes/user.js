const express = require('express');
const router = express.Router();
const validateSchema = require('../utilities/validateSchema.js');
const wrapAsync = require('../utilities/wrapAsync.js');
const { userSchema } = require('../schemas.js');
const session = require('express-session');
const joinCodeHandler = require('../utilities/joinCodeHandler.js');

const User = require('../models/user');
const passport = require('passport');
const { isLoggedIn, storeReturnTo } = require('../utilities/middleware.js');

router.get('/signup', (req, res, next) => {
    res.render('users/signup.ejs');
});

router.post('/signup', validateSchema(userSchema), wrapAsync(async (req, res, next) => {
    try {
        let { username, email, phone, role, companyName, joinCode, password } = req.body;
        if (role === 'admin') {
            joinCode = joinCodeHandler();
        }
        const user = new User({ username, email, phone, role, companyName, joinCode });
        const registeredUser = await User.register(user, password);
        req.login(registeredUser, err => {
            if (err) return next(err);
            req.flash('success', `Welcome to LunaLink! ${registeredUser.role === 'admin' ? `Your Join Code is: ${registeredUser.joinCode}. Please share this code with your team so they can join your organization on Luna Link.` : ''}`);
            res.redirect('/users/login');
        });
    } catch (e) {
        req.flash('error', e.message);
        res.redirect('/users/signup');
    }
}));

router.get('/login', (req, res, next) => {
    res.render('users/login.ejs');
});

router.post('/login',
    storeReturnTo,
    passport.authenticate('local',
        {
            failureFlash: true,
            failureRedirect: '/users/login',
            keepSessionInfo: true
        }),
    (req, res) => {
        req.flash('success', `Welcome back, ${req.body.username}!`);
        const redirectUrl = req.session.returnTo || '/users/dashboard';
        res.redirect(redirectUrl);
    });

router.get('/account', (req, res, next) => {
    res.render('users/account.ejs');
});

router.get('/dashboard', (req, res, next) => {
    res.render('users/dashboard.ejs');
});

router.get('/logout', isLoggedIn, (req, res) => {
    // req.logout is a method that comes from passport and requires a callback function to handle any errors
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        req.flash('success', 'Goodbye!');
        res.redirect('/');
    });
});

module.exports = router;