import express from "express";
import authenticate from "../middlewares/authenticate.js";
import validateBody from "../middlewares/validateBody.js";
import { boardAddSchema } from "../schemas/joiSchemas/boardSchemas.js";
import boardControllers from "../controllers/boardControllers.js";

const boardRouter = express.Router();

boardRouter.use(authenticate);

boardRouter.post(
  "/",
  validateBody(boardAddSchema),
  boardControllers.createBoard
);

export default boardRouter;
