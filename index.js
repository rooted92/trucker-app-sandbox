const express = require('express');
const app = express();
const path = require('path');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');
const ExpressError = require('./utilities/ExpressError.js');
const wrapAsync = require('./utilities/wrapAsync.js');

// Models
const Driver = require('./models/driver.js'); // Import driver model
const Trailer = require('./models/trailer.js'); // Import trailer model
const Yard = require('./models/yard.js'); // Import yard model

// Schemas
const { driverSchema } = require('./schemas.js'); // Import driver schema

// Arrays for dropdowns
const trailerTypes = [
    'Dry Van',
    'Reefer',
    'Flatbed',
    'Step Deck',
    'Double Drop',
    'Lowboy',
    'Conestoga',
    'Power Only',
    'Tanker'
];
const trailerStatuses = ['Available', 'In Transit', 'Docked'];
const yardStatuses = ['Open', 'Closed'];

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

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));

// Function to check for errors, will use in routes. This function already uses try catch, so we don't need to use it in the routes. Saves us from having to write try catch in every route.

const validateDriver = (req, res, next) => {
    const { error } = driverSchema.validate(req.body);
    if (error) {
        // What is .details? It is a property of the error object that returns an array of objects with the error details
        const msg = error.details.map(el => el.message).join(',');
        throw new ExpressError(msg, 400);
    } else {
        next();
    }
};


// Home route
app.get('/', (req, res) => {
    res.render('dashboard.ejs');
});

// DRIVER ROUTES***************************************************************************************

// All Drivers route
app.get('/drivers', wrapAsync(async (req, res) => {
    const drivers = await Driver.find({});
    res.render('drivers/index.ejs', { drivers });
}));

// Add new driver route
// A more specific route should be placed above a more general route, so this route should be placed above the view single driver route (see below)
app.get('/driver/new', (req, res) => {
    res.render('drivers/new-driver.ejs');
});

// Create new driver route
app.post('/drivers', validateDriver, wrapAsync(async (req, res) => {
    // What is req.body? It is the data that is sent in the POST request from the form
    const newDriver = new Driver(req.body);
    // Save the new driver to the database
    await newDriver.save();
    // Why do we need async await here? Because we are saving to the database, which is an asynchronous operation
    // Redirect to the drivers page
    res.redirect('/drivers');
}));

// View single driver route
app.get('/driver/:id', wrapAsync(async (req, res) => {
    const { id } = req.params;
    const driver = await Driver.findById(id);
    res.render('drivers/driver.ejs', { driver });
}));

// Edit driver route
app.get('/driver/:id/edit', wrapAsync(async (req, res) => {
    const { id } = req.params;
    const driverToUpdate = await Driver.findById(id);
    res.render('drivers/edit-driver.ejs', { driverToUpdate });
}));

// Update driver route
app.patch('/driver/:id', validateDriver, wrapAsync(async (req, res) => {
    const { id } = req.params;
    const updateDriver = await Driver.findByIdAndUpdate(id, req.body, { runValidators: true, new: true });
    res.redirect(`/driver/${updateDriver._id}`);
}));

// Delete driver route
app.delete('/driver/:id', wrapAsync(async (req, res) => {
    const { id } = req.params;
    // Await the deletion of the driver, then redirect to the drivers page
    await Driver.findByIdAndDelete(id);
    res.redirect('/drivers');
}));

// TRAILER ROUTES***************************************************************************************

// All Trailers route
app.get('/trailers', async (req, res) => {
    const trailers = await Trailer.find({});
    res.render('trailers/index.ejs', { trailers });
});

// Add new trailer route
app.get('/trailer/new', (req, res) => {
    res.render('trailers/new-trailer.ejs', { trailerTypes, trailerStatuses });
});

// Create new trailer route
app.post('/trailers', (req, res) => {
    const newTrailer = new Trailer(req.body);
    newTrailer.save();
    res.redirect('/trailers');
});

// Single Trailer route
app.get('/trailer/:id', async (req, res) => {
    const { id } = req.params;
    const trailer = await Trailer.findById(id);
    res.render('trailers/trailer.ejs', { trailer });
});

// Edit trailer route
app.get('/trailer/:id/edit', async (req, res) => {
    const { id } = req.params;
    const trailerToUpdate = await Trailer.findById(id);
    res.render('trailers/edit-trailer.ejs', { trailerToUpdate, trailerStatuses });
});

// Update trailer route
app.patch('/trailer/:id', async (req, res) => {
    const { id } = req.params;
    // What is runValidators? It is a mongoose option that runs the validators that are defined in the schema
    // What is new? It is a mongoose option that returns the updated document rather than the original
    // Dont need to save to variable, just awaiting the update
    await Trailer.findByIdAndUpdate(id, req.body, { runValidators: true, new: true })
    res.redirect('/trailers');
});

// Delete trailer route
app.delete('/trailer/:id', async (req, res) => {
    const { id } = req.params;
    await Trailer.findByIdAndDelete(id);
    res.redirect('/trailers');
});

// YARD ROUTES***************************************************************************************

// All Yard route
app.get('/yards', async (req, res) => {
    const yards = await Yard.find({});
    res.render('yards/index.ejs', { yards });
});

// Add new yard route
app.get('/yard/new', (req, res) => {
    res.render('yards/new-yard.ejs', { yardStatuses });
});

// Create new yard route
app.post('/yards', async (req, res) => {
    const newYard = new Yard(req.body);
    await newYard.save();
    res.redirect('/yards');
});

// Single Yard route
app.get('/yard/:id', async (req, res) => {
    const { id } = req.params;
    const yard = await Yard.findById(id);
    res.render('yards/yard.ejs', { yard });
});

// Edit Yard route
app.get('/yard/:id/edit', async (req, res) => {
    const { id } = req.params;
    const yard = await Yard.findById(id);
    res.render('yards/edit-yard.ejs', { yard, yardStatuses });
});

// Update Yard route
app.patch('/yard/:id', async (req, res) => {
    const { id } = req.params;
    await Yard.findByIdAndUpdate(id, req.body, { runValidators: true, new: true });
    res.redirect('/yards');
});

// Delte Yard route
app.delete('/yard/:id', async (req, res) => {
    const { id } = req.params;
    await Yard.findByIdAndDelete(id);
    res.redirect('/yards');
});

// Catch errors

app.all('*', (req, res, next) => {
    next(new ExpressError('Page Not Found', 404));
});

app.use((err, req, res, next) => {
    const { statusCode = 500 } = err;
    if(!err.message) err.message = "Luna Link is experiencing technical difficulties.";
    res.status(statusCode).render('error.ejs', { err, statusCode });
});

// Start server

app.listen(3000, () => {
    console.log("App is listening on port 3000");
});