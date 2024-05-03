import { Schema, model } from "mongoose";
import handleMongooseError from "../../hooks/handleMongooseError.js";
import THEME_TYPES from "../../constants/themeTypes.js";
import EMAIL_REGEXP from "../../constants/emailRegexp.js";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    password: {
      type: String,
      match: /^\S+$/,
      required: [true, "Password is required"],
    },
    email: {
      type: String,
      match: EMAIL_REGEXP,
      required: [true, "Email is required"],
      unique: true,
    },
    avatar: {
      type: String,
      required: true,
    },
    theme: {
      type: String,
      enum: THEME_TYPES,
      default: "dark",
    },
    token: {
      type: String,
      default: null,
    },
  },
  { versionKey: false }
);

userSchema.post("save", handleMongooseError);

const User = model("user", userSchema);

export default User;
