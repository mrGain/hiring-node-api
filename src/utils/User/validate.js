const Joi = require("joi");


// Login Validation
const loginValidation = (data) => {
    const schema = Joi.object({
        email: Joi.string()
            .min(6)
            .required()
            .email(),
        password: Joi.string()
            .min(6)
            .required(),
    });
    const Validation = schema.validate(data);
    return Validation;
};

module.exports.loginValidation = loginValidation;
