import express from "express";
import authControllers from "../controllers/authControllers.js";
import validateBody from "../helpers/validateBody.js";
import {
  userLoginSchema,
  userRegistrationSchema,
} from "../schemas/joiSchemas/userSchemas.js";

const authRouter = express.Router();

authRouter.post(
  "/register",
  validateBody(userRegistrationSchema),
  authControllers.register
);

authRouter.post("/login", validateBody(userLoginSchema), authControllers.login);

export default authRouter;
