import { Schema, model } from "mongoose";
import handleMongooseError from "../../hooks/handleMongooseError.js";

const columnSchema = new Schema(
  {
    title: {
      type: String,
      unique: true,
      required: [true, "Title is required"],
    },
    cards: [
      {
        type: Schema.Types.ObjectId,
        ref: "card",
      },
    ],
    board: {
      type: Schema.Types.ObjectId,
      ref: "board",
    },
  },
  { versionKey: false }
);

columnSchema.post("save", handleMongooseError);

const Column = model("column", columnSchema);

export default Column;
