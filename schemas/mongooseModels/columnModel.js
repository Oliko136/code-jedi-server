import { Schema, model } from "mongoose";
import handleMongooseError from "../../hooks/handleMongooseError.js";
import setUpdateSetting from "../../hooks/setUpdateSettings.js";

const columnSchema = new Schema(
  {
    title: {
      type: String,
      unique: true,
      required: [true, "Title is required"],
    },
    board: {
      type: Schema.Types.ObjectId,
      ref: "board",
    },
  },
  { versionKey: false }
);

columnSchema.post("save", handleMongooseError);

columnSchema.pre("findOneAndUpdate", setUpdateSetting);

columnSchema.post("findOneAndUpdate", handleMongooseError);

const Column = model("column", columnSchema);

export default Column;
