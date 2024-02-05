const Joi = require('joi');
const ExpressError = require('./ExpressError.js');

// Function to validate schemas using Joi
const validateSchema = (schema) => {
    return (req, res, next) => {
        const { error } = schema.validate(req.body);
        if (error) {
            const msg = error.details.map(el => el.message).join(',');
            throw new ExpressError(msg, 400);
        } else {
            next();
        }
    }
};

module.exports = validateSchema;