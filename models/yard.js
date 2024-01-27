const mongoose = require('mongoose');

// Create yard schema

const yardSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    capacity: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        required: true
    }
});

// Compile yard schema into a model

const Yard = mongoose.model('Yard', yardSchema);

// Export model

module.exports = Yard;