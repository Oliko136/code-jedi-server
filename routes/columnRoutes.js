import express from "express";
import authenticate from "../middlewares/authenticate.js";
import validateBody from "../middlewares/validateBody.js";
import { columnSchema } from "../schemas/joiSchemas/columnSchemas.js";
import columnControllers from "../controllers/columnControllers.js";

const columnRouter = express.Router();

columnRouter.use(authenticate);

columnRouter.post(
  "/:boardId/columns",
  validateBody(columnSchema),
  columnControllers.createColumn
);

export default columnRouter;
