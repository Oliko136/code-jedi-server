import Board from "../schemas/mongooseModels/boardModel.js";

export const addBoard = (body) => Board.create(body);
