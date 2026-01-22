const Joi = require("joi");

const schema = Joi.object({
  title: Joi.string()
    .min(3)
    .max(200)
    .required()
    .messages({
      "string.base": "Title must be a text",
      "string.empty": "Title is required",
      "string.min": "Title must be at least 3 characters",
      "string.max": "Title must be less than 200 characters",
      "any.required": "Title is required",
    }),

  content: Joi.string()
    .min(10)
    .required()
    .messages({
      "string.empty": "Content is required",
      "string.min": "Content must be at least 10 characters",
      "any.required": "Content is required",
    }),

  author: Joi.string()
    .min(2)
    .max(100)
    .required()
    .messages({
      "string.empty": "Author is required",
      "string.min": "Author must be at least 2 characters",
      "string.max": "Author must be less than 100 characters",
      "any.required": "Author is required",
    }),

  tags: Joi.array()
    .items(Joi.string().messages({
      "string.base": "Each tag must be a string",
    }))
    .optional(),

  published: Joi.boolean().messages({
    "boolean.base": "Published must be true or false",
  }),

  likes: Joi.number()
    .min(0)
    .messages({
      "number.base": "Likes must be a number",
      "number.min": "Likes cannot be negative",
    }),
});

module.exports = schema;
