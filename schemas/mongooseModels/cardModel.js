import { Schema, model } from "mongoose";
import handleMongooseError from "../../hooks/handleMongooseError.js";
import setUpdateSetting from "../../hooks/setUpdateSettings.js";
import PRIORITY_LIST from "../../constants/priorityList.js";

const cardSchema = new Schema(
  {
    title: {
      type: String,
      unique: true,
      required: [true, "Title is required"],
    },
    description: {
      type: String,
    },
    priority: {
      type: String,
      enum: PRIORITY_LIST,
      default: "without",
    },
    deadline: Date,
    column: {
      type: Schema.Types.ObjectId,
      ref: "column",
    },
  },
  { versionKey: false }
);

cardSchema.post("save", handleMongooseError);

cardSchema.pre("findOneAndUpdate", setUpdateSetting);

cardSchema.post("findOneAndUpdate", handleMongooseError);

const Card = model("card", cardSchema);

export default Card;
