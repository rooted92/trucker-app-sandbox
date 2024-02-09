const express = require('express');
const router = express.Router();
const Yard = require('../models/yard.js');
const Trailer = require('../models/trailer.js');
const wrapAsync = require('../utilities/wrapAsync.js');
const { yardSchema } = require('../schemas.js');
const validateSchema = require('../utilities/validateSchema.js');
const arrays = require('../utilities/arrays.js');

// If I were to make a trailer count form, would I need to use a different schema? No, you would just need to add a new field to the existing schema

// Would I need to create a new route for the form? Yes, you would need to create a new route for the form. Would it be in the YARD ROUTES? Yes, it would be in the YARD ROUTES

// All Yard route
router.get('/', wrapAsync(async (req, res) => {
    const yards = await Yard.find({});
    res.render('yards/index.ejs', { yards });
}));

// Add new yard route
router.get('/new', (req, res) => {
    res.render('yards/new-yard.ejs', { arrays });
});

// Create new yard route
router.post('/', validateSchema(yardSchema), wrapAsync(async (req, res) => {
    const newYard = new Yard(req.body);
    await newYard.save();
    res.redirect('/yards');
}));

// Single Yard route
router.get('/:id', wrapAsync(async (req, res) => {
    const { id } = req.params;
    const yard = await Yard.findById(id).populate('trailers');
    res.render('yards/yard.ejs', { yard });
}));

// Edit Yard route
router.get('/:id/edit', wrapAsync(async (req, res) => {
    const { id } = req.params;
    const yard = await Yard.findById(id);
    res.render('yards/edit-yard.ejs', { yard, arrays });
}));

// Update Yard route
router.patch('/:id', validateSchema(yardSchema), wrapAsync(async (req, res) => {
    const { id } = req.params;
    await Yard.findByIdAndUpdate(id, req.body, { runValidators: true, new: true });
    res.redirect(`/yards/${id}`);
}));

// Delte Yard route
router.delete('/:id', wrapAsync(async (req, res) => {
    const { id } = req.params;
    await Yard.findByIdAndDelete(id);
    res.redirect('/yards');
}));

// Trailer Count Form route
router.get('/:id/trailers/submission-form', async (req, res) => {
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
    console.log(yard);
    res.redirect(`/yards/${id}`);
}));

module.exports = router;