const express = require('express');
const app = express();
const path = require('path');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const multer = require('multer');
const ejsMate = require('ejs-mate');
const ExpressError = require('./utilities/ExpressError.js');
const driverRoutes = require('./routes/driver.js');
const trailerRoutes = require('./routes/trailer.js');
const yardRoutes = require('./routes/yard.js');
const upload = multer();

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


// Home route
app.get('/', (req, res) => {
    res.render('dashboard.ejs');
});

// DRIVER ROUTES
app.use('/drivers', driverRoutes);

// TRAILER ROUTES
app.use('/trailers', trailerRoutes);

// YARD ROUTES
app.use('/yards', yardRoutes);

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
app.listen(3000, () => {
    console.log("App is listening on port 3000");
});