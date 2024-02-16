const Joi = require('joi');

// Joi schema for drivers
const driverSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    truckId: Joi.string().required(),
    company: Joi.string().required()
}).required();

module.exports.driverSchema = driverSchema;

// Joi schema for trailers

const trailerSchema = Joi.object({
    number: Joi.string().required(),
    type: Joi.string().valid('Dry Van', 'Reefer', 'Flatbed', 'Step Deck', 'Double Drop', 'Lowboy', 'Conestoga', 'Power Only', 'Tanker').required(),
    length: Joi.number().valid(28, 32, 36, 40, 45, 48, 50, 53).required(),
    loadStatus: Joi.string().valid('Loaded', 'Empty').required(),
    cleanliness: Joi.string().valid('Clean', 'Dirty', 'N/A').required(),
    trailerStatus: Joi.string().valid('Available', 'In Transit', 'Docked', 'In Service', 'Out of Service', 'In Repair').required(),
    notes: Joi.string().allow(''),
});

module.exports.trailerSchema = trailerSchema;

// Joi schema for yards

const yardSchema = Joi.object({
    name: Joi.string().required(),
    location: Joi.string().required(),
    capacity: Joi.number().required(),
    status: Joi.string().valid('Open', 'Closed').required(),
    // trailers: Joi.array().items(Joi.string()),
}).required();

module.exports.yardSchema = yardSchema;

// Joi schema for users
const userSchema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
    email: Joi.string().required(),
    phone: Joi.string().required(),
    role: Joi.string().required(),
    companyName: Joi.string().required(),
    joinCode: Joi.string().allow(''),
}).required();

module.exports.userSchema = userSchema;