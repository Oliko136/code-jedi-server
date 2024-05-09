import express from "express";
import authenticate from "../middlewares/authenticate.js";
import validateBody from "../middlewares/validateBody.js";
import isValidId from "../middlewares/isValidId.js";
import cardControllers from "../controllers/cardControllers.js";
import {
  cardAddSchema,
  cardEditSchema,
  cardEditСolumnSchema,
} from "../schemas/joiSchemas/cardSchemas.js";

const cardRouter = express.Router();

cardRouter.use(authenticate);

cardRouter.post(
  "/:boardId/columns/:columnId/cards",
  validateBody(cardAddSchema),
  cardControllers.createCard
);

cardRouter.get(
  "/:boardId/columns/:columnId/cards",
  cardControllers.getAllCards
);

cardRouter.get(
  "/:boardId/columns/:columnId/cards/:id",
  isValidId,
  cardControllers.getOneCard
);

cardRouter.put(
  "/:boardId/columns/:columnId/cards/:id",
  isValidId,
  validateBody(cardEditSchema),
  cardControllers.updateCard
);

cardRouter.patch(
  "/:boardId/columns/:columnId/cards/:id",
  isValidId,
  validateBody(cardEditСolumnSchema),
  cardControllers.updateCardColumn
);

cardRouter.delete(
  "/:boardId/columns/:columnId/cards/:id",
  isValidId,
  cardControllers.deleteCard
);

export default cardRouter;
