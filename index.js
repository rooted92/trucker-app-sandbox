const express = require('express');
const app = express();
const path = require('path');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');
const ExpressError = require('./utilities/ExpressError.js');
const wrapAsync = require('./utilities/wrapAsync.js');
const arrays = require('./utilities/arrays.js');

// Models
const Driver = require('./models/driver.js'); // Import driver model
const Trailer = require('./models/trailer.js'); // Import trailer model
const Yard = require('./models/yard.js'); // Import yard model

// Schemas
const { driverSchema, trailerSchema, yardSchema } = require('./schemas.js'); // Import schemas

// Arrays for dropdowns
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

// Function to validate schemas using Joi
const validateSchema = (schema) => {
    return (req, res, next) => {
        const { error } = schema.validate(req.body);
        if (error) {
            const msg = error.details.map(el => el.message).join(',');
            throw new ExpressError(msg, 400);
        } else {
            next();
        }
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
app.post('/drivers', validateSchema(driverSchema), wrapAsync(async (req, res) => {
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
app.patch('/driver/:id', validateSchema(driverSchema), wrapAsync(async (req, res) => {
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
app.get('/trailers', wrapAsync(async (req, res) => {
    const trailers = await Trailer.find({});
    res.render('trailers/index.ejs', { trailers });
}));

// Add new trailer route
app.get('/trailer/new', (req, res) => {
    res.render('trailers/new-trailer.ejs', { arrays });
});

// Create new trailer route
app.post('/trailers', validateSchema(trailerSchema), (req, res) => {
    const newTrailer = new Trailer(req.body);
    newTrailer.save();
    res.redirect('/trailers');
});

// Single Trailer route
app.get('/trailer/:id', wrapAsync(async (req, res) => {
    const { id } = req.params;
    const trailer = await Trailer.findById(id);
    res.render('trailers/trailer.ejs', { trailer });
}));

// Edit trailer route
app.get('/trailer/:id/edit', wrapAsync(async (req, res) => {
    const { id } = req.params;
    const trailer = await Trailer.findById(id);
    console.log(trailer.length);
    res.render('trailers/edit-trailer.ejs', { trailer, arrays });
}));

// Update trailer route
app.patch('/trailer/:id', validateSchema(trailerSchema), wrapAsync(async (req, res) => {
    const { id } = req.params;
    // What is runValidators? It is a mongoose option that runs the validators that are defined in the schema
    // What is new? It is a mongoose option that returns the updated document rather than the original
    // Dont need to save to variable, just awaiting the update
    await Trailer.findByIdAndUpdate(id, req.body, { runValidators: true, new: true })
    res.redirect(`/trailer/${id}`);
}));

// Delete trailer route
app.delete('/trailer/:id', wrapAsync(async (req, res) => {
    const { id } = req.params;
    await Trailer.findByIdAndDelete(id);
    res.redirect('/trailers');
}));

// YARD ROUTES***************************************************************************************
// If I were to make a trailer count form, would I need to use a different schema? No, you would just need to add a new field to the existing schema

// Would I need to create a new route for the form? Yes, you would need to create a new route for the form. Would it be in the YARD ROUTES? Yes, it would be in the YARD ROUTES

// All Yard route
app.get('/yards', wrapAsync(async (req, res) => {
    const yards = await Yard.find({});
    res.render('yards/index.ejs', { yards });
}));

// Add new yard route
app.get('/yard/new', (req, res) => {
    res.render('yards/new-yard.ejs', { arrays });
});

// Create new yard route
app.post('/yards', validateSchema(yardSchema), wrapAsync(async (req, res) => {
    const newYard = new Yard(req.body);
    await newYard.save();
    res.redirect('/yards');
}));

// Single Yard route
app.get('/yard/:id', wrapAsync(async (req, res) => {
    const { id } = req.params;
    const yard = await Yard.findById(id);
    res.render('yards/yard.ejs', { yard });
}));

// Edit Yard route
app.get('/yard/:id/edit', wrapAsync(async (req, res) => {
    const { id } = req.params;
    const yard = await Yard.findById(id);
    res.render('yards/edit-yard.ejs', { yard, yardStatuses });
}));

// Update Yard route
app.patch('/yard/:id', validateSchema(yardSchema), wrapAsync(async (req, res) => {
    const { id } = req.params;
    await Yard.findByIdAndUpdate(id, req.body, { runValidators: true, new: true });
    res.redirect(`/yard/${id}`);
}));

// Delte Yard route
app.delete('/yard/:id', wrapAsync(async (req, res) => {
    const { id } = req.params;
    await Yard.findByIdAndDelete(id);
    res.redirect('/yards');
}));

// Trailer Count Form route
app.get('/yards/:id/trailer-count/new', async (req, res) => {
    const { id } = req.params;
    const yard = await Yard.findById(id);
    console.log(yard)
    res.render('trailer-count/trailer-count-form.ejs', { yard, arrays });
});

app.post('/yard/:id/trailer-count', wrapAsync(async (req, res) => {

}));

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