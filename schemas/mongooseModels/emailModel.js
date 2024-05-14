import { Schema, model } from "mongoose";
import handleMongooseError from "../../hooks/handleMongooseError.js";
import EMAIL_REGEXP from "../../constants/emailRegexp.js";

const emailSchema = new Schema({
  email: {
    type: String,
    match: EMAIL_REGEXP,
    required: [true, "Email is required"],
    unique: true,
  },

  comment: {
    type: String,
    default: "",
    required: [true, "Comment is required"],
  },
});

emailSchema.post("save", handleMongooseError);

const Email = model("email", userSchema);

export default Email;
