import Board from "../schemas/mongooseModels/boardModel.js";

export const createBoard = (body) => Board.create(body);

export const getAllBoards = (filter) =>
  Board.find(filter).populate("owner", "email");

export const countBoards = (filter) => Board.countDocuments(filter);

export const getBoardByFilter = (filter) => Board.findOne(filter);

export const updateBoard = (filter, body) =>
  Board.findOneAndUpdate(filter, body);

export const deleteBoard = (filter) => Board.findOneAndDelete(filter);
