import Joi from "joi";
import emailRegexp from "../../constants/emailRegexp.js";
import THEME_TYPES from "../../constants/themeTypes.js";

export const userRegistrationSchema = Joi.object({
  name: Joi.string().required().messages({
    "string.base": "Name must be a string",
    "any.required": "Missing required field name",
  }),
  email: Joi.string().pattern(emailRegexp).required().messages({
    "string.base": "Email must be a string",
    "string.pattern.base": "Incorrect email format",
    "any.required": "Missing required field email",
  }),
  password: Joi.string().required().messages({
    "string.base": "Password must be a string",
    "any.required": "Missing required field password",
  }),
});

export const userLoginSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required().messages({
    "string.base": "Email must be a string",
    "string.pattern.base": "Incorrect email format",
    "any.required": "Missing required field email",
  }),
  password: Joi.string().required().messages({
    "string.base": "Password must be a string",
    "any.required": "Missing required field password",
  }),
});

export const updateUserThemeSchema = Joi.object({
  subscription: Joi.string()
    .valid(...THEME_TYPES)
    .required()
    .messages({
      "string.base": "Theme must be a string",
      "string.valid": "Invalid theme value",
      "any.required": "Missing required field theme",
    }),
});
