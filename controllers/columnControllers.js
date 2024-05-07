import HttpError from "../helpers/HttpError.js";
import controllerDecorator from "../helpers/controllerDecorator.js";
import * as columnServices from "../services/columnServices.js";

export const createColumn = async (req, res) => {
  const { boardId: board } = req.params;
  const { title } = req.body;
  const column = await columnServices.getColumnByFilter({ board, title });
  if (column) {
    throw HttpError(409, "This title already exists");
  }
  const result = await columnServices.createColumn({
    ...req.body,
    board,
  });
  res.status(201).json(result);
};

const getAllColumns = async (req, res) => {
  const { boardId: board } = req.params;
  const filter = { board };
  const result = await columnServices.getAllColumns(filter);
  const total = await columnServices.countColumns(filter);
  res.json({ result, total });
};

const getOneColumn = async (req, res) => {
  const { boardId: board, id } = req.params;
  const result = await columnServices.getColumnByFilter({ board, _id: id });
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

const updateColumn = async (req, res) => {
  const { boardId: board, id } = req.params;
  const { title } = req.body;
  const column = await columnServices.getColumnByFilter({ board, title });
  if (column) {
    throw HttpError(409, "This title already exists");
  }
  const result = await columnServices.updateColumn(
    { board, _id: id },
    req.body
  );
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

const deleteColumn = async (req, res) => {
  const { boardId: board, id } = req.params;
  const result = await columnServices.deleteColumn({ board, _id: id });
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

export default {
  createColumn: controllerDecorator(createColumn),
  getAllColumns: controllerDecorator(getAllColumns),
  getOneColumn: controllerDecorator(getOneColumn),
  updateColumn: controllerDecorator(updateColumn),
  deleteColumn: controllerDecorator(deleteColumn),
};
