import express from "express";
import authControllers from "../controllers/authControllers.js";
import validateBody from "../middlewares/validateBody.js";
import {
  updateUserProfileSchema,
  updateUserThemeSchema,
  userLoginSchema,
  userRegistrationSchema,
} from "../schemas/joiSchemas/userSchemas.js";
import authenticate from "../middlewares/authenticate.js";
import upload from "../middlewares/upload.js";

const authRouter = express.Router();

authRouter.post(
  "/register",
  validateBody(userRegistrationSchema),
  authControllers.register
);

authRouter.post("/login", validateBody(userLoginSchema), authControllers.login);

authRouter.patch(
  "/",
  authenticate,
  validateBody(updateUserThemeSchema),
  authControllers.updateTheme
);

authRouter.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  authControllers.updateAvatar
);

authRouter.put(
  "/",
  authenticate,
  validateBody(updateUserProfileSchema),
  authControllers.updateProfile7362d51fdf755e531956ea8502da9bab4712645
);

authRouter.get("/current", authenticate, authControllers.getCurrentUser);

authRouter.post("/logout", authenticate, authControllers.logout);

export default authRouter;
