import express from "express";
import validateBody from "../middlewares/validateBody.js";
import authenticate from "../middlewares/authenticate.js";
import upload from "../middlewares/upload.js";
import { updateUserProfileSchema, updateUserThemeSchema } from "../schemas/joiSchemas/userSchemas.js";

const userRouter = express.Router();

userRouter.put(
  "/",
  authenticate,
  validateBody(updateUserProfileSchema),
  authControllers.updateProfile
);

userRouter.patch(
  "/",
  authenticate,
  validateBody(updateUserThemeSchema),
  authControllers.updateTheme
);

userRouter.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  authControllers.updateAvatar
);



export default userRouter;