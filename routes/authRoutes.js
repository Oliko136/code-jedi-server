import express from "express";
import authControllers from "../controllers/authControllers.js";
import validateBody from "../middlewares/validateBody.js";
import {
  userLoginSchema,
  userRegistrationSchema,
} from "../schemas/joiSchemas/userSchemas.js";
import authenticate from "../middlewares/authenticate.js";

const authRouter = express.Router();

authRouter.post(
  "/register",
  validateBody(userRegistrationSchema),
  authControllers.register
);

authRouter.post("/login", validateBody(userLoginSchema), authControllers.login);

authRouter.get("/current", authenticate, authControllers.getCurrentUser);

export default authRouter;
