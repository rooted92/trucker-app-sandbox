const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Yard = require('./yard.js');

// Create trailer schema
const trailerSchema = new Schema({
    number: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ['Dry Van', 'Reefer', 'Flatbed', 'Step Deck', 'Double Drop', 'Lowboy', 'Conestoga', 'Power Only', 'Tanker'],
        required: true
    },
    length: {
        type: Number,
        enum: [28, 32, 36, 40, 45, 48, 50, 53],
        required: true
    },
    loadStatus: {
        type: String,
        enum: ['Loaded', 'Empty'],
        required: true
    },
    cleanliness: {
        type: String,
        enum: ['Clean', 'Dirty', 'N/A'],
        required: true
    },
    trailerStatus: {
        type: String,
        enum: ['Available', 'In Transit', 'Docked', 'In Service', 'Out of Service', 'In Repair'],
        required: true
    },
    notes: {
        type: String
    },
    yard: {
        type: Schema.Types.ObjectId,
        ref: 'Yard',
    }
});

trailerSchema.post('findOneAndDelete', async function (trailer) {
    if (trailer.yard) {
        const yard = await Yard.findById(trailer.yard);
        yard.trailers.pull(trailer);
        await yard.save();
    }
});

// Compile trailer schema into a model

const Trailer = mongoose.model('Trailer', trailerSchema);

// Export model

module.exports = Trailer;