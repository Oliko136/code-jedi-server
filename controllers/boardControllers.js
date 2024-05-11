import HttpError from "../helpers/HttpError.js";
import controllerDecorator from "../helpers/controllerDecorator.js";
import * as boardServices from "../services/boardServices.js";
import * as columnServices from "../services/columnServices.js";
import * as cardServices from "../services/cardServices.js";

const createBoard = async (req, res) => {
  const { _id: owner } = req.user;
  const { title } = req.body;
  const board = await boardServices.getBoardByFilter({ owner, title });
  if (board) {
    throw HttpError(409, "This title already exists");
  }
  const result = await boardServices.createBoard({ ...req.body, owner });
  res.status(201).json(result);
};

const getAllBoards = async (req, res) => {
  const { _id: owner } = req.user;
  const filter = { owner };
  const result = await boardServices.getAllBoards(filter);
  const total = await boardServices.countBoards(filter);
  res.json({ result, total });
};

const getOneBoard = async (req, res) => {
  const { _id: owner } = req.user;
  const { id } = req.params;
  const result = await boardServices.getBoardByFilter({ owner, _id: id });
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

const updateBoard = async (req, res) => {
  const { _id: owner } = req.user;
  const { id } = req.params;
  const { title } = req.body;
  const board = await boardServices.getBoardByFilter({ owner, title });
  if (board) {
    throw HttpError(409, "This title already exists");
  }
  const result = await boardServices.updateBoard({ owner, _id: id }, req.body);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

const deleteBoard = async (req, res) => {
  const { _id: owner } = req.user;
  const { id } = req.params;
  const columns = await columnServices.getAllColumns({ board: id });
  for (const column of columns) {
    const cards = await cardServices.getAllCards({ column: column._id });
    for (const card of cards) {
      await cardServices.deleteCard({ column: column._id, _id: card._id });
    }
    await columnServices.deleteColumn({ _id: column._id });
  }
  const result = await boardServices.deleteBoard({ owner, _id: id });
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

export default {
  createBoard: controllerDecorator(createBoard),
  getAllBoards: controllerDecorator(getAllBoards),
  getOneBoard: controllerDecorator(getOneBoard),
  updateBoard: controllerDecorator(updateBoard),
  deleteBoard: controllerDecorator(deleteBoard),
};
