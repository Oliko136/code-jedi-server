import controllerDecorator from "../helpers/controllerDecorator.js";
import * as columnServices from "../services/columnServices.js";

export const createColumn = async (req, res) => {
  // const { _id: owner } = req.user;
  const { boardId } = req.params;
  const result = await columnServices.createColumn({
    ...req.body,
    // owner,
    board: boardId,
  });
  res.status(201).json(result);
};

export default {
  createColumn: controllerDecorator(createColumn),
};
