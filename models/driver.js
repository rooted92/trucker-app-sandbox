const mongoose = require('mongoose');

// Create driver schema
const driverSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    truckId: {
        type: String,
        required: true
    },
    company: {
        type: String,
        required: true
    }
});

// Compile driver schema into a model

const Driver = mongoose.model('Driver', driverSchema);

// Export model

module.exports = Driver;