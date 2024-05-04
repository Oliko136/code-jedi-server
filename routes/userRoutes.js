import express from "express";
import userControllers from "../controllers/userControllers.js";
import validateBody from "../middlewares/validateBody.js";
import authenticate from "../middlewares/authenticate.js";
import upload from "../middlewares/upload.js";
import { updateUserProfileSchema, updateUserThemeSchema } from "../schemas/joiSchemas/userSchemas.js";

const userRouter = express.Router();

userRouter.put(
  "/",
  authenticate,
  validateBody(updateUserProfileSchema),
  userControllers.updateProfile
);

userRouter.patch(
  "/",
  authenticate,
  validateBody(updateUserThemeSchema),
  userControllers.updateTheme
);

userRouter.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  userControllers.updateAvatar
);



export default userRouter;