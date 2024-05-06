import controllerDecorator from "../helpers/controllerDecorator.js";
import * as boardServices from "../services/boardServices.js";

export const addBoard = async (req, res) => {
  const { _id: owner } = req.user;
  const result = await boardServices.addBoard({ ...req.body, owner });
  res.status(201).json(result);
};

export default {
  addBoard: controllerDecorator(addBoard),
};
