const express = require('express');
const app = express();
const path = require('path');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');
const ExpressError = require('./utilities/ExpressError.js');
const wrapAsync = require('./utilities/wrapAsync.js');
const arrays = require('./utilities/arrays.js');
const driverRoutes = require('./routes/driver.js');
const trailerRoutes = require('./routes/trailer.js');
const yardRoutes = require('./routes/yard.js');

// Models
const Trailer = require('./models/trailer.js'); // Import trailer model
const Yard = require('./models/yard.js'); // Import yard model

// Schemas
const { yardSchema } = require('./schemas.js'); // Import schemas

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
app.use(express.static('public'));

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

// DRIVER ROUTES
app.use('/drivers', driverRoutes);

// TRAILER ROUTES
app.use('/trailers', trailerRoutes);

// YARD ROUTES

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
app.get('/yards/:id/trailers/submission-form', async (req, res) => {
    const { id } = req.params;
    const yard = await Yard.findById(id);
    res.render('trailer-count/trailer-count-form.ejs', { yard, arrays });
});

app.post('/yards/:id/trailers', wrapAsync(async (req, res) => {
    const { id } = req.params;
    const yard = await Yard.findById(id);
    const trailer = new Trailer(req.body);
    yard.trailers.push(trailer);
    console.log(yard);
    res.send(yard);
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