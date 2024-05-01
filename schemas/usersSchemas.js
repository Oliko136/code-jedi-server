import Joi from "joi";
import { emailRegexp, themeList } from "../constants/user-constants.js";

export const usersRegistrationSchema = Joi.object({
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

export const usersLoginSchema = Joi.object({
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

export const updateUsersThemeSchema = Joi.object({
  subscription: Joi.string()
    .valid(...themeList)
    .required()
    .messages({
      "string.base": "Theme must be a string",
      "string.valid": "Invalid theme value",
      "any.required": "Missing required field theme",
    }),
});
