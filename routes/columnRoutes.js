import express from "express";
import authenticate from "../middlewares/authenticate.js";
import validateBody from "../middlewares/validateBody.js";
import isValidId from "../middlewares/isValidId.js";
import { columnSchema } from "../schemas/joiSchemas/columnSchemas.js";
import columnControllers from "../controllers/columnControllers.js";

const columnRouter = express.Router();

columnRouter.use(authenticate);

columnRouter.post(
  "/:boardId/columns",
  validateBody(columnSchema),
  columnControllers.createColumn
);

columnRouter.get("/:boardId/columns", columnControllers.getAllColumns);

columnRouter.get(
  "/:boardId/columns/:id",
  isValidId,
  columnControllers.getOneColumn
);

columnRouter.put(
  "/:boardId/columns/:id",
  isValidId,
  validateBody(columnSchema),
  columnControllers.updateColumn
);

columnRouter.delete(
  "/:boardId/columns/:id",
  isValidId,
  columnControllers.deleteColumn
);

export default columnRouter;
