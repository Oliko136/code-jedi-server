import Joi from "joi";
import PRIORITY_LIST from "../../constants/priorityList.js";

export const cardAddSchema = Joi.object({
  title: Joi.string().min(2).required().messages({
    "string.base": "Title must be a string",
    "string.min": "Title must have a minimum length of {#limit} symbols",
    "string.empty": "Title should not be empty",
    "any.required": "Missing required field title",
  }),
  description: Joi.string().allow("").messages({
    "string.base": "Description must be a string",
  }),
  priority: Joi.string()
    .valid(...PRIORITY_LIST)
    .messages({
      "string.base": "Priority must be a string",
      "any.only": "Invalid priority value",
    }),
  deadline: Joi.date().min(new Date()).iso().messages({
    "date.base": "Deadline must be a valid date",
    "date.min": "Deadline must be in the future",
    "date.format": "Deadline must be in ISO format (YYYY-MM-DD)",
  }),
});

export const cardEditSchema = Joi.object({
  title: Joi.string().min(2).messages({
    "string.base": "Title must be a string",
    "string.empty": "Title should not be empty",
    "string.min": "Title must have a minimum length of {#limit} symbols",
  }),
  description: Joi.string().allow("").messages({
    "string.base": "Description must be a string",
  }),
  priority: Joi.string()
    .valid(...PRIORITY_LIST)
    .messages({
      "string.base": "Priority must be a string",
      "any.only": "Invalid priority value",
    }),
  deadline: Joi.date().min(new Date()).iso().messages({
    "date.base": "Deadline must be a valid date",
    "date.min": "Deadline must be in the future",
    "date.format": "Deadline must be in ISO format (YYYY-MM-DD)",
  }),
});

export const cardEditСolumnSchema = Joi.object({
  column: Joi.string()
    .pattern(/^[0-9a-fA-F]{24}$/)
    .required()
    .messages({
      "string.base": "Column must be a string",
      "string.empty": "Column should not be empty",
      "string.pattern.base": "Incorrect column format",
      "any.required": "Column is required",
    }),
});
