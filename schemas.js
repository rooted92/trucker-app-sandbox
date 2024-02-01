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
    trailerId: Joi.string().required(),
    trailerType: Joi.string().valid('Dry Van', 'Reefer', 'Flatbed', 'Step Deck', 'Double Drop', 'Lowboy', 'Conestoga', 'Power Only', 'Tanker').required(),
    trailerStatus: Joi.string().valid('Available', 'In Transit', 'Docked').required(),
    trailerLocation: Joi.string().required()
}).required();

module.exports.trailerSchema = trailerSchema;

// Joi schema for yards

const yardSchema = Joi.object({
    name: Joi.string().required(),
    location: Joi.string().required(),
    capacity: Joi.number().required(),
    status: Joi.string().valid('Open', 'Closed').required()
}).required();

module.exports.yardSchema = yardSchema;