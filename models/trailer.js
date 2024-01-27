const mongoose = require('mongoose');

// Create trailer schema
const trailerSchema = new mongoose.Schema({
    trailerId: {
        type: String,
        required: true
    },
    trailerType: {
        type: String,
        enum: ['Dry Van', 'Reefer', 'Flatbed', 'Step Deck', 'Double Drop', 'Lowboy', 'Conestoga', 'Power Only', 'Tanker'],
        required: true
    },
    trailerStatus: {
        type: String,
        enum: ['Available', 'In Transit', 'Docked'],
        required: true
    },
    trailerLocation: {
        type: String,
        required: true
    }
});

// Compile trailer schema into a model

const Trailer = mongoose.model('Trailer', trailerSchema);

// Export model

module.exports = Trailer;