const mongoose = require('mongoose');
const { Schema } = mongoose;

// Create yard schema

const yardSchema = new Schema({
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
        enum: ['Open', 'Closed'],
        required: true
    },
    trailers: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Trailer'
        }
    ]
});

// Compile yard schema into a model

const Yard = mongoose.model('Yard', yardSchema);

// Export model

module.exports = Yard;