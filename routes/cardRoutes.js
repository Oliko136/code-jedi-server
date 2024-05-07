import express from "express";
import authenticate from "../middlewares/authenticate.js";
import validateBody from "../middlewares/validateBody.js";
import { cardAddSchema } from "../schemas/joiSchemas/cardSchemas.js";
import cardControllers from "../controllers/cardControllers.js";

const cardRouter = express.Router();

cardRouter.use(authenticate);

cardRouter.post(
  "/:boardId/columns/:columnId/cards",
  validateBody(cardAddSchema),
  cardControllers.createCard
);

export default cardRouter;
