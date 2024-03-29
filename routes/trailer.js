const express = require('express');
const router = express.Router();
const Trailer = require('../models/trailer.js');
const wrapAsync = require('../utilities/wrapAsync.js');
const { trailerSchema } = require('../schemas.js');
const validateSchema = require('../utilities/validateSchema.js');
const arrays = require('../utilities/arrays.js');
const { isLoggedIn } = require('../utilities/middleware.js');


// All Trailers
router.get('/', wrapAsync(async (req, res) => {
    const trailers = await Trailer.find({}).populate('yard');
    res.render('trailers/index.ejs', { trailers });
}));

// Add new trailer
router.get('/new', isLoggedIn, (req, res) => {
    res.render('trailers/new-trailer.ejs', { arrays });
});

// Create new trailer 
router.post('/', validateSchema(trailerSchema), (req, res) => {
    const newTrailer = new Trailer(req.body);
    newTrailer.save();
    req.flash('success', 'Successfully added a new trailer!');
    res.redirect('/trailers');
});

// Single Trailer
router.get('/:id', wrapAsync(async (req, res) => {
    const { id } = req.params;
    const trailer = await Trailer.findById(id).populate('yard');
    if(!trailer) {
        req.flash('error', 'Cannot find that trailer!');
        return res.redirect('/trailers');
    }
    res.render('trailers/trailer.ejs', { trailer });
}));

// Edit trailer
router.get('/:id/edit', wrapAsync(async (req, res) => {
    const { id } = req.params;
    const trailer = await Trailer.findById(id);
    if(!trailer) {
        req.flash('error', 'Cannot find that trailer!');
        return res.redirect('/trailers');
    }
    res.render('trailers/edit-trailer.ejs', { trailer, arrays });
}));

// Update trailer
router.patch('/:id', validateSchema(trailerSchema), wrapAsync(async (req, res) => {
    const { id } = req.params;
    // What is runValidators? It is a mongoose option that runs the validators that are defined in the schema
    // What is new? It is a mongoose option that returns the updated document rather than the original
    // Dont need to save to variable, just awaiting the update
    await Trailer.findByIdAndUpdate(id, req.body, { runValidators: true, new: true });
    req.flash('success', 'Successfully updated trailer!');
    res.redirect(`/trailers/${id}`);
}));

// Delete trailer
router.delete('/:id', wrapAsync(async (req, res) => {
    const { id } = req.params;
    await Trailer.findByIdAndDelete(id);
    req.flash('success', 'Successfully deleted trailer!');
    res.redirect('/trailers');
}));


module.exports = router;