import express from "express";
import authControllers from "../controllers/authControllers.js";
import validateBody from "../middlewares/validateBody.js";
import authenticate from "../middlewares/authenticate.js";
import { userLoginSchema, userRegistrationSchema } from "../schemas/joiSchemas/userSchemas.js";

const authRouter = express.Router();

authRouter.post(
  "/register",
  validateBody(userRegistrationSchema),
  authControllers.register
);

authRouter.post("/login", validateBody(userLoginSchema), authControllers.login);

authRouter.get("/current", authenticate, authControllers.getCurrentUser);

authRouter.post("/logout", authenticate, authControllers.logout);

export default authRouter;
