import Column from "../schemas/mongooseModels/columnModel.js";

export const createColumn = (body) => Column.create(body);

export const getAllColumns = (filter) =>
  Column.find(filter).populate("board", "title");

export const countColumns = (filter) => Column.countDocuments(filter);

export const getColumnByFilter = (filter) => Column.findOne(filter);

export const updateColumn = (filter, body) =>
  Column.findOneAndUpdate(filter, body);

export const deleteColumn = (filter) => Column.findOneAndDelete(filter);
