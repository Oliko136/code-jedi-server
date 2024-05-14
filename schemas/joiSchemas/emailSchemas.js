import Joi from "joi";

export const supportEmailSchema = Joi.object({
  email: Joi.string().required().messages({
    "string.empty": '"email" cannot be an empty field',
    "any.required": 'missing required field "email"',
  }),
  comment: Joi.string().min(10).required().messages({
    "string.empty": '"comment" cannot be an empty field',
    "any.required": 'missing required field "comment"',
    "string.min": "comment must have a minimum length of {#limit} symbols",
  }),
});
