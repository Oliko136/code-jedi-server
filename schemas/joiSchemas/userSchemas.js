import Joi from "joi";
import EMAIL_REGEXP from "../../constants/emailRegexp.js";
import THEME_TYPES from "../../constants/themeTypes.js";

export const userRegistrationSchema = Joi.object({
  name: Joi.string().min(2).max(32).required().messages({
    "string.base": "Name must be a string",
    "string.min": "Name must have a minimum length of {#limit} symbols",
    "string.max": "Name must have a maximum length of {#limit} symbols",
    "any.required": "Missing required field name",
  }),
  email: Joi.string().pattern(EMAIL_REGEXP).required().messages({
    "string.base": "Email must be a string",
    "string.pattern.base": "Incorrect email format",
    "any.required": "Missing required field email",
  }),
  password: Joi.string().min(8).max(64).pattern(/^\S+$/).required().messages({
    "string.base": "Password must be a string",
    "string.min": "Password must have a minimum length of {#limit} symbols",
    "string.max": "Password must have a maximum length of {#limit} symbols",
    "string.pattern.base": "Password must not contain spaces",
    "any.required": "Missing required field password",
  }),
});

export const userLoginSchema = Joi.object({
  email: Joi.string().pattern(EMAIL_REGEXP).required().messages({
    "string.base": "Email must be a string",
    "string.pattern.base": "Incorrect email format",
    "any.required": "Missing required field email",
  }),
  password: Joi.string().min(8).max(64).pattern(/^\S+$/).required().messages({
    "string.base": "Password must be a string",
    "string.min": "Password must have a minimum length of {#limit} symbols",
    "string.max": "Password must have a maximum length of {#limit} symbols",
    "string.pattern.base": "Password must not contain spaces",
    "any.required": "Missing required field password",
  }),
});

export const updateUserThemeSchema = Joi.object({
  theme: Joi.string()
    .valid(...THEME_TYPES)
    .required()
    .messages({
      "string.base": "Theme must be a string",
      "any.only": "Invalid theme value",
      "any.required": "Missing required field theme",
    }),
});

export const updateUserProfileSchema = Joi.object({
  name: Joi.string().min(2).max(32).messages({
    "string.base": "Name must be a string",
    "string.min": "Name must have a minimum length of {#limit} symbols",
    "string.max": "Name must have a maximum length of {#limit} symbols",
  }),
  email: Joi.string().pattern(EMAIL_REGEXP).messages({
    "string.base": "Email must be a string",
    "string.pattern.base": "Incorrect email format",
  }),
  password: Joi.string().min(8).max(64).pattern(/^\S+$/).messages({
    "string.base": "Password must be a string",
    "string.min": "Password must have a minimum length of {#limit} symbols",
    "string.max": "Password must have a maximum length of {#limit} symbols",
    "string.pattern.base": "Password must not contain spaces",
  }),
});
