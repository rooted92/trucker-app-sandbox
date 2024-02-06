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
    const yard = await Yard.findById(id);
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
    res.redirect(`/yard/${id}`);
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
    const yard = await Yard.findById(id);
    console.log('Here is request body:', req.body.trailers);
    console.log(yard);
    res.send(yard);
}));

// router.post('/:id/trailers', wrapAsync(async (req, res) => {
//     const { id } = req.params;
//     const yard = await Yard.findById(id);
//     const trailerData = req.body.trailers; // Make sure this is an array of trailer objects.

//     // Loop through each trailer object submitted
//     for (let data of trailerData) {
//         let trailer;
//         if (data._id) {
//             // Update existing trailer and associate it with this yard
//             trailer = await Trailer.findByIdAndUpdate(data._id, {
//               ...data,
//               yard: yard._id // Ensure the yard is associated
//             }, { new: true });
//         } else {
//             // Create a new trailer and associate it with this yard
//             trailer = new Trailer({
//               ...data,
//               yard: yard._id // Ensure the yard is associated
//             });
//             await trailer.save();
//         }
//         // Add trailer's _id to the yard's trailers array if not already present
//         if (!yard.trailers.includes(trailer._id)) {
//             yard.trailers.push(trailer._id);
//         }
//     }
    
//     await yard.save(); // Save the yard document with the new trailer references
//     res.redirect(`/yards/${id}`); // Redirect to the yard's detail page, for instance
// }));

module.exports = router;