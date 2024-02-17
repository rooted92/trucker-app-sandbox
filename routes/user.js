const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const validateSchema = require('../utilities/validateSchema.js');

const User = require('../models/user');

router.get('/', (req, res, next) => {
    res.send('User Account')
});

router.get('/signup', (req, res, next) => {
    console.log('signup route');
    res.render('users/signup.ejs');
});

router.get('/login', (req, res, next) => {
    res.render('users/login.ejs');
});

router.post('/signup', (req, res, next) => {

});

module.exports = router;