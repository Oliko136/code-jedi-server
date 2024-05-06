import { Schema, model } from "mongoose";
import handleMongooseError from "../../hooks/handleMongooseError.js";
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
      default: "default",
    },
    background: {
      type: String,
      enum: BACKGROUND_LIST,
      default: "default",
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  },
  { versionKey: false }
);

boardSchema.post("save", handleMongooseError);

const Board = model("board", boardSchema);

export default Board;
