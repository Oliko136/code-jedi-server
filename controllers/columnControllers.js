import HttpError from "../helpers/HttpError.js";
import controllerDecorator from "../helpers/controllerDecorator.js";
import PRIORITY_LIST from "../constants/priorityList.js";
import * as columnServices from "../services/columnServices.js";
import * as cardServices from "../services/cardServices.js";

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
  const { priority } = req.query;
  if (priority && !PRIORITY_LIST.includes(priority)) {
    throw HttpError(400, "Invalid priority value");
  }
  const filter = { board };
  const columns = await columnServices.getAllColumns(filter);
  const totalColumns = await columnServices.countColumns(filter);
  const getAllCardsForFilter = async (columnId, priority) => {
    const filter = { column: columnId };
    if (priority) {
      filter.priority = priority;
    }
    const cards = await cardServices.getAllCards(filter);
    return cards;
  };
  const columnsWithFilteredCards = await Promise.all(
    columns.map(async (column) => {
      const cards = await getAllCardsForFilter(column._id, priority);
      return { ...column.toObject(), cards };
    })
  );

  res.json({ result: columnsWithFilteredCards, total: totalColumns });

  // const result = await columnServices.getAllColumns(filter);
  // const total = await columnServices.countColumns(filter);
  // res.json({ result, total, cards });
  // const getAllCardsForColumn = async (columnId) => {
  //   const filter = { column: columnId };
  //   const cards = await cardServices.getAllCards(filter);
  //   return cards;
  // };
  // const columnsWithCards = await Promise.all(
  //   columns.map(async (column) => {
  //     const cards = await getAllCardsForColumn(column._id);
  //     return { columns: { ...column.toObject() }, cards };
  //   })
  // );

  // res.json({ result: columns, total: totalColumns });
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
  const cards = await cardServices.getAllCards({ column: id });
  for (const card of cards) {
    await cardServices.deleteCard({
      column: id,
      _id: card._id,
    });
  }
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
