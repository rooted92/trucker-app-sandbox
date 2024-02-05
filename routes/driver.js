const express = require('express');
const router = express.Router();
const Driver = require('../models/driver');
const wrapAsync = require('../utilities/wrapAsync.js');
const { driverSchema } = require('../schemas.js');
const validateSchema = require('../utilities/validateSchema.js');


// All Drivers route
router.get('/', wrapAsync(async (req, res) => {
    const drivers = await Driver.find({});
    res.render('drivers/index.ejs', { drivers });
}));

// Add new driver route
// A more specific route should be placed above a more general route, so this route should be placed above the view single driver route (see below)
router.get('/new', (req, res) => {
    res.render('drivers/new-driver.ejs');
});

// Create new driver route
router.post('/', validateSchema(driverSchema), wrapAsync(async (req, res) => {
    // What is req.body? It is the data that is sent in the POST request from the form
    const newDriver = new Driver(req.body);
    // Save the new driver to the database
    await newDriver.save();
    // Why do we need async await here? Because we are saving to the database, which is an asynchronous operation
    // Redirect to the drivers page
    res.redirect('/drivers');
}));

// View single driver route
router.get('/:id', wrapAsync(async (req, res) => {
    const { id } = req.params;
    const driver = await Driver.findById(id);
    res.render('drivers/driver.ejs', { driver });
}));

// Edit driver route
router.get('/:id/edit', wrapAsync(async (req, res) => {
    const { id } = req.params;
    const driverToUpdate = await Driver.findById(id);
    res.render('drivers/edit-driver.ejs', { driverToUpdate });
}));

// Update driver route
router.patch('/:id', validateSchema(driverSchema), wrapAsync(async (req, res) => {
    const { id } = req.params;
    const updateDriver = await Driver.findByIdAndUpdate(id, req.body, { runValidators: true, new: true });
    res.redirect(`/drivers/${updateDriver._id}`);
}));

// Delete driver route
router.delete('/:id', wrapAsync(async (req, res) => {
    const { id } = req.params;
    // Await the deletion of the driver, then redirect to the drivers page
    await Driver.findByIdAndDelete(id);
    res.redirect('/drivers');
}));

module.exports = router;