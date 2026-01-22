const Joi = require("joi");

const schema = Joi.object({
  page: Joi.number()
    .min(1)
    .optional()
    .messages({
      "number.base": "Page must be a number",
      "number.min": "Page must be greater than or equal to 1",
    }),

  limit: Joi.number()
    .min(1)
    .max(100)
    .optional()
    .messages({
      "number.base": "Limit must be a number",
      "number.min": "Limit must be at least 1",
      "number.max": "Limit cannot be greater than 100",
    }),
})

  .options({ convert: true }); 

module.exports = schema;
