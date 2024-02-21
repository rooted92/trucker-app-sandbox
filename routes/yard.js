const express = require('express');
const router = express.Router();
const Yard = require('../models/yard.js');
const Trailer = require('../models/trailer.js');
const wrapAsync = require('../utilities/wrapAsync.js');
const { yardSchema } = require('../schemas.js');
const validateSchema = require('../utilities/validateSchema.js');
const arrays = require('../utilities/arrays.js');
const { isLoggedIn } = require('../utilities/middleware.js');

// If I were to make a trailer count form, would I need to use a different schema? No, you would just need to add a new field to the existing schema

// Would I need to create a new route for the form? Yes, you would need to create a new route for the form. Would it be in the YARD ROUTES? Yes, it would be in the YARD ROUTES

// All Yard route
router.get('/', wrapAsync(async (req, res) => {
    const yards = await Yard.find({});
    res.render('yards/index.ejs', { yards });
}));

// Add new yard route
router.get('/new', isLoggedIn, (req, res) => {
    res.render('yards/new-yard.ejs', { arrays });
});

// Create new yard route
router.post('/', validateSchema(yardSchema), wrapAsync(async (req, res) => {
    const newYard = new Yard(req.body);
    await newYard.save();
    req.flash('success', 'Successfully added a new yard!');
    res.redirect('/yards');
}));

// Single Yard route
router.get('/:id', wrapAsync(async (req, res) => {
    const { id } = req.params;
    const yard = await Yard.findById(id).populate('trailers');
    if(!yard) {
        req.flash('error', 'Cannot find that yard!');
        return res.redirect('/yards');
    }
    res.render('yards/yard.ejs', { yard });
}));

// Edit Yard route
router.get('/:id/edit', isLoggedIn, wrapAsync(async (req, res) => {
    const { id } = req.params;
    const yard = await Yard.findById(id);
    if(!yard) {
        req.flash('error', 'Cannot find that yard!');
        return res.redirect('/yards');
    }
    res.render('yards/edit-yard.ejs', { yard, arrays });
}));

// Update Yard route
router.patch('/:id', validateSchema(yardSchema), wrapAsync(async (req, res) => {
    const { id } = req.params;
    await Yard.findByIdAndUpdate(id, req.body, { runValidators: true, new: true });
    req.flash('success', 'Successfully updated yard!');
    res.redirect(`/yards/${id}`);
}));

// Delete Yard route
router.delete('/:id', wrapAsync(async (req, res) => {
    const { id } = req.params;
    await Yard.findByIdAndDelete(id);
    req.flash('success', 'Successfully deleted yard!');
    res.redirect('/yards');
}));

// Trailer Count Form route
router.get('/:id/trailers/submission-form', isLoggedIn, async (req, res) => {
    const { id } = req.params;
    const yard = await Yard.findById(id);
    res.render('trailer-count/trailer-count-form.ejs', { yard, arrays });
});

router.post('/:id/trailers', wrapAsync(async (req, res) => {
    const { id } = req.params;
    const { trailers } = req.body;
    const yard = await Yard.findById(id);
    for (let trailer of trailers) {
        const foundTrailer = await Trailer.findOne({ number: trailer.number });
        if (!foundTrailer) {
            const newTrailer = new Trailer(trailer);
            newTrailer.yard = yard._id;
            await newTrailer.save();
            yard.trailers.push(newTrailer);
        } else {
            foundTrailer.yard = yard._id;
            await foundTrailer.save();
            yard.trailers.push(foundTrailer);
        }
    }
    await yard.save();
    req.flash('success', 'Successfully added trailers to yard!');
    res.redirect(`/yards/${id}`);
}));

module.exports = router;