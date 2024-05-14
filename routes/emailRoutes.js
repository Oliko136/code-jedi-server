import express from "express";
import mailController from "../controllers/emailControllers.js";
import { supportEmailSchema } from "../schemas/joiSchemas/emailSchemas.js";
import validateBody from "../middlewares/validateBody.js";
import authenticate from "../middlewares/authenticate.js";

const emailRouter = express.Router();

emailRouter.post(
  "/",
  authenticate,
  validateBody(supportEmailSchema),
  mailController.sendHelpEmail
);

export default emailRouter;
