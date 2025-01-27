const { Schema, model } = require('mongoose');
const Joi = require("joi");

const contactSchema = Schema({
    name: {
        type: String,
        required: [true, 'Set name for contact'],
    },
    email: {
        type: String,
    },
    phone: {
        type: String,
    },
    favorite: {
        type: Boolean,
        default: false,
    },
      owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    },
});

const addSchema = Joi.object({
    name: Joi.string(),
    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
    phone: Joi.string().required(),
    favorite: Joi.boolean().default(false),
});

const updateFavorite = Joi.object({
    favorite: Joi.boolean().required(),
})

const Contact = model("contact", contactSchema); 

module.exports ={
    Contact,
    addSchema,
    updateFavorite,
}
