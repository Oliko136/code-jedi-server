import Joi from "joi";

export const columnSchema = Joi.object({
  title: Joi.string().min(2).required().messages({
    "string.base": "Title must be a string",
    "string.min": "Title must have a minimum length of {#limit} symbols",
    "string.empty": "Title must not be empty",
    "any.required": "Missing required field title",
  }),
});
