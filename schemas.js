const Joi = require('joi');

// Joi schema for drivers
const driverSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    truckId: Joi.string().required(),
    company: Joi.string().required()
}).required();

module.exports.driverSchema = driverSchema;