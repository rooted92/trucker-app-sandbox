const express = require('express');
const app = express();
const path = require('path');
const methodOverride = require('method-override');
const { v4: uuid } = require('uuid');
const mongoose = require('mongoose');

// Models
const Driver = require('./models/driver'); // Import driver model
const Trailer = require('./models/trailer'); // Import trailer model
const Yard = require('./models/yard'); // Import yard model

let trailerTypes = [
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

let trailerStatuses = ['Available', 'In Transit', 'Docked'];

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/lunaLink')
    .then(() => {
        console.log("Mongo Connection Open");
    })
    .catch(err => {
        console.log("Mongo Connection Error");
        console.log(err);
    })

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));

// Home route
app.get('/', (req, res) => {
    res.render('dashboard.ejs');
});

// DRIVER ROUTES***************************************************************************************

// All Drivers route
app.get('/drivers', async (req, res) => {
    const drivers = await Driver.find({});
    res.render('drivers/index.ejs', { drivers });
});

// Add new driver route
// A more specific route should be placed above a more general route, so this route should be placed above the view single driver route (see below)
app.get('/driver/new', (req, res) => {
    console.log("New driver route hit");
    res.render('drivers/new-driver.ejs', { trailerTypes, trailerStatuses });
});

// Create new driver route
app.post('/drivers', (req, res) => {
    const { name, email, truckId, company } = req.body;
    drivers.push({ name, email, truckId, company, id: uuid() });
    res.redirect('/drivers');
});

// View single driver route
app.get('/driver/:id', (req, res) => {
    const { id } = req.params;
    const driver = drivers.find(d => d.id === id);
    res.render('drivers/driver.ejs', { driver });
});

// Edit driver route
app.get('/driver/:id/edit', (req, res) => {
    const { id } = req.params;
    const driverToUpdate = drivers.find(d => d.id === id);
    res.render('drivers/edit-driver.ejs', { driverToUpdate });
});

// Update driver route
app.patch('/driver/:id', (req, res) => {
    const { id } = req.params;
    const updatedDriver = req.body;
    const driver = drivers.find(d => d.id === id);
    driver.name = updatedDriver.name;
    driver.email = updatedDriver.email;
    driver.truckId = updatedDriver.truckId;
    driver.company = updatedDriver.company;
    res.redirect('/drivers');
});

// Delete driver route
app.delete('/driver/:id', (req, res) => {
    const { id } = req.params;
    drivers = drivers.filter(d => d.id !== id);
    res.redirect('/drivers');
});

// TRAILER ROUTES***************************************************************************************

// All Trailers route
app.get('/trailers', (req, res) => {
    res.render('trailers/index.ejs', { trailers });
});

// Add new trailer route
app.get('/trailer/new', (req, res) => {
    res.render('trailers/new-trailer.ejs');
});

// Create new trailer route
app.post('/trailers', (req, res) => {
    const { trailerId, trailerType, trailerStatus, trailerLocation } = req.body;
    trailers.push({ trailerId, trailerType, trailerStatus, trailerLocation, id: uuid() });
    res.redirect('/trailers');
});

// Single Trailer route
app.get('/trailer/:id', (req, res) => {
    const { id } = req.params;
    const trailer = trailers.find(t => t.id === id);
    res.render('trailers/trailer.ejs', { trailer });
});

// Edit trailer route
app.get('/trailer/:id/edit', (req, res) => {
    const { id } = req.params;
    const trailerToUpdate = trailers.find(t => t.id === id);
    res.render('trailers/edit-trailer.ejs', { trailerToUpdate });
});

// Update trailer route
app.patch('/trailer/:id', (req, res) => {
    const { id } = req.params;
    const trailerToUpdate = req.body;
    const trailer = trailers.find(t => t.id === id);
    trailer.trailerId = trailerToUpdate.trailerId;
    trailer.trailerType = trailerToUpdate.trailerType;
    trailer.trailerStatus = trailerToUpdate.trailerStatus;
    trailer.trailerLocation = trailerToUpdate.trailerLocation;
    res.redirect('/trailers');
});

// Delete trailer route
app.delete('/trailer/:id', (req, res) => {
    const { id } = req.params;
    trailers = trailers.filter(t => t.id !== id);
    res.redirect('/trailers');
});

// YARD ROUTES***************************************************************************************

// All Yard route
app.get('/yards', (req, res) => {
    res.render('yards/index.ejs', { yards });
});

// Add new yard route
app.get('/yard/new', (req, res) => {
    res.render('yards/new-yard.ejs');
});

// Create new yard route
app.post('/yards', (req, res) => {
    const { yardName, yardLocation, yardCapacity, yardStatus} = req.body;
    yards.push({yardName, yardLocation, yardCapacity, yardStatus, id: uuid()});
    res.redirect('/yards');
});

// Single Yard route
app.get('/yard/:id', (req, res) => {
    const { id } = req.params;
    const yard = yards.find(y => y.id === id);
    res.render('yards/yard.ejs', { yard });
});

// Edit Yard route
app.get('/yard/:id/edit', (req, res) => {
    const { id } = req.params;
    const yard = yards.find(y => y.id === id);
    res.render('yards/edit-yard.ejs', { yard });
})

// Update Yard route
app.patch('/yard/:id', (req, res) => {
    const { id } = req.params;
    const yardToUpdate = req.body;
    const yard = yards.find(y => y.id === id);
    yard.yardName = yardToUpdate.yardName;
    yard.yardLocation = yardToUpdate.yardLocation;
    yard.yardCapacity = yardToUpdate.yardCapacity;
    yard.yardStatus = yardToUpdate.yardStatus;
    res.redirect('/yards');
})

// Delte Yard route
app.delete('/yard/:id', (req, res) => {
    const { id } = req.params;
    yards = yards.filter(y => y.id !== id);
    res.redirect('/yards');
})

// Start server

app.listen(3000, () => {
    console.log("App is listening on port 3000");
});