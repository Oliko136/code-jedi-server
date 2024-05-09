import { Schema, model } from "mongoose";
import handleMongooseError from "../../hooks/handleMongooseError.js";
import setUpdateSetting from "../../hooks/setUpdateSettings.js";
import ICONS_LIST from "../../constants/iconsList.js";
import BACKGROUND_LIST from "../../constants/backgroundList.js";

const boardSchema = new Schema(
  {
    title: {
      type: String,
      unique: true,
      required: [true, "Title is required"],
    },
    icon: {
      type: String,
      enum: ICONS_LIST,
      default: "project",
    },
    background: {
      type: String,
      enum: BACKGROUND_LIST,
      default: "default",
    },
    columns: [
      {
        type: Schema.Types.ObjectId,
        ref: "column",
      },
    ],
    cards: [
      {
        type: Schema.Types.ObjectId,
        ref: "card",
      },
    ],
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  },
  { versionKey: false }
);

boardSchema.post("save", handleMongooseError);

boardSchema.pre("findOneAndUpdate", setUpdateSetting);

boardSchema.post("findOneAndUpdate", handleMongooseError);

const Board = model("board", boardSchema);

export default Board;
