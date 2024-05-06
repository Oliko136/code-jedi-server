import Board from "../schemas/mongooseModels/boardModel.js";

export const createBoard = (body) => Board.create(body);
