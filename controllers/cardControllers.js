import controllerDecorator from "../helpers/controllerDecorator.js";
import * as cardServices from "../services/cardServices.js";

export const createCard = async (req, res) => {
  // const { _id: owner } = req.user;
  const { columnId } = req.params;
  const result = await cardServices.createCard({
    ...req.body,
    column: columnId,
  });
  res.status(201).json(result);
};

export default {
  createCard: controllerDecorator(createCard),
};
