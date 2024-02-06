const express = require('express');
const router = express.Router();
const Trailer = require('../models/trailer.js');
const wrapAsync = require('../utilities/wrapAsync.js');
const { trailerSchema } = require('../schemas.js');
const validateSchema = require('../utilities/validateSchema.js');
const arrays = require('../utilities/arrays.js');


// All Trailers route
router.get('/', wrapAsync(async (req, res) => {
    const trailers = await Trailer.find({});
    res.render('trailers/index.ejs', { trailers });
}));

// Add new trailer route
router.get('/new', (req, res) => {
    res.render('trailers/new-trailer.ejs', { arrays });
});

// Create new trailer route
router.post('/', validateSchema(trailerSchema), (req, res) => {
    const newTrailer = new Trailer(req.body);
    newTrailer.save();
    res.redirect('/trailers');
});

// Single Trailer route
router.get('/:id', wrapAsync(async (req, res) => {
    const { id } = req.params;
    const trailer = await Trailer.findById(id);
    res.render('trailers/trailer.ejs', { trailer });
}));

// Edit trailer route
router.get('/:id/edit', wrapAsync(async (req, res) => {
    const { id } = req.params;
    const trailer = await Trailer.findById(id);
    console.log(trailer.length);
    res.render('trailers/edit-trailer.ejs', { trailer, arrays });
}));

// Update trailer route
router.patch('/:id', validateSchema(trailerSchema), wrapAsync(async (req, res) => {
    const { id } = req.params;
    // What is runValidators? It is a mongoose option that runs the validators that are defined in the schema
    // What is new? It is a mongoose option that returns the updated document rather than the original
    // Dont need to save to variable, just awaiting the update
    await Trailer.findByIdAndUpdate(id, req.body, { runValidators: true, new: true })
    res.redirect(`/trailers/${id}`);
}));

// Delete trailer route
router.delete('/:id', wrapAsync(async (req, res) => {
    const { id } = req.params;
    await Trailer.findByIdAndDelete(id);
    res.redirect('/trailers');
}));


module.exports = router;