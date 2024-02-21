const express = require('express');
const app = express();
const PORT = 8080;
const path = require('path');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const multer = require('multer');
const ejsMate = require('ejs-mate');
const ExpressError = require('./utilities/ExpressError.js');
const driverRoutes = require('./routes/driver.js');
const trailerRoutes = require('./routes/trailer.js');
const yardRoutes = require('./routes/yard.js');
const userRoutes = require('./routes/user.js');
const upload = multer();
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local');

const User = require('./models/user.js');

// Set up session
const sessionConfig = { secret: 'secretkeyexample', resave: false, saveUninitialized: true, cookie: { httpOnly: true, expires: Date.now() + 1000 * 60 * 60 * 24 * 7, maxAge: 1000 * 60 * 60 * 24 * 7 } }

app.use(session(sessionConfig));
app.use(flash());// all request will have access to flash

// Set up passport
app.use(passport.initialize());
app.use(passport.session());
// The method 'authenticate' is located on User model automatically via passportLocalMongoose and used in the LocalStrategy
passport.use(new LocalStrategy(User.authenticate()));

// How to store a user in the session, we use the serializeUser method from passportLocalMongoose
passport.serializeUser(User.serializeUser());
// How to get a user out of the session, we use the deserializeUser method from passportLocalMongoose
passport.deserializeUser(User.deserializeUser());

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/lunaLink')
    .then(() => {
        console.log("Mongo Connection Open");
    })
    .catch(err => {
        console.log("Mongo Connection Error");
        console.log(err);
    });

// Set up EJS
app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(upload.none());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(express.static('public'));
app.use('/font', express.static(__dirname + '/node_modules/bootstrap-icons/font'));

// Middleware to display flash messages in all routes, templates, and views
app.use((req, res, next) => {
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
});

// Home route
app.get('/', (req, res) => {
    res.render('home.ejs');
});

// DRIVER ROUTES
app.use('/drivers', driverRoutes);

// TRAILER ROUTES
app.use('/trailers', trailerRoutes);

// YARD ROUTES
app.use('/yards', yardRoutes);

// USER ROUTES
app.use('/users', userRoutes);

// Catch errors
app.all('*', (req, res, next) => {
    next(new ExpressError('Page Not Found', 404));
});

app.use((err, req, res, next) => {
    const { statusCode = 500 } = err;
    if (!err.message) err.message = "Luna Link is experiencing technical difficulties.";
    res.status(statusCode).render('error.ejs', { err, statusCode });
});

// Start server
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});