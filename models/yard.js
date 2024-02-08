const mongoose = require('mongoose');
const { Schema } = mongoose;
const Trailer = require('./trailer.js');

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

yardSchema.post('findOneAndDelete', async function (yard) {
    if (yard.trailers.length) {
        const res = await Trailer.deleteMany({ _id: { $in: yard.trailers } });
        console.log(res);
    }
});

// Compile yard schema into a model

const Yard = mongoose.model('Yard', yardSchema);

// Export model

module.exports = Yard;