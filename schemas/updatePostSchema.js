    const Joi = require("joi");

    const bodySchema = Joi.object({
    title: Joi.string()
        .min(3)
        .max(200)
        .optional()
        .messages({
        "string.base": "Title must be a text",
        "string.min": "Title must be at least 3 characters",
        "string.max": "Title must be less than 200 characters",
        }),

    content: Joi.string()
        .min(10)
        .optional()
        .messages({
        "string.base": "Content must be a text",
        "string.min": "Content must be at least 10 characters",
        }),

    author: Joi.string()
        .min(2)
        .max(100)
        .optional()
        .messages({
        "string.base": "Author must be a text",
        "string.min": "Author must be at least 2 characters",
        "string.max": "Author must be less than 100 characters",
        }),

    tags: Joi.array()
        .items(
        Joi.string().messages({
            "string.base": "Each tag must be a string",
        })
        )
        .optional(),

    published: Joi.boolean().messages({
        "boolean.base": "Published must be true or false",
    }),
    })
    
    .min(1)
    .messages({
        "object.min": "At least one field must be provided for update",
    });

    const paramsSchema = Joi.object({
    id: Joi.string()
        .hex()
        .length(24)
        .required()
        .messages({
        "string.hex": "Invalid post id format",
        "string.length": "Post id must be 24 characters",
        "any.required": "Post id is required",
        }),
    });

    module.exports = {
    bodySchema,
    paramsSchema,
    };
