import bcrypt from "bcrypt";
import fs from "fs/promises";
import path from "path";
import Jimp from "jimp";
import * as userServices from "../services/userServices.js";
import HttpError from "../helpers/HttpError.js";
import controllerDecorator from "../helpers/controllerDecorator.js";
import cloudinary from "../helpers/cloudinary.js";

const posterPath = path.resolve("images", "public", "avatar");

const updateProfile = async (req, res) => {
  const { email, password } = req.user;
  const user = await userServices.findUser({ email });
  if (!user) {
    throw HttpError(404, "User not found");
  }
  const hashPassword = await bcrypt.hash(password, 10);
  const result = await userServices.updateUser(
    { email },
    { ...req.body, password: hashPassword }
  );
  res.json({
    name: result.name,
    email: result.email
  });
};

const updateTheme = async (req, res) => {
  const { theme } = req.body;
  const { email } = req.user;
  const user = await userServices.findUser({ email });
  if (!user) {
    throw HttpError(404, "User not found");
  }

  const result = await userServices.updateUser({ email }, { theme });

  res.json({
    user: {
      theme: result.theme
    }
  });
};

const updateAvatar = async (req, res) => {
  if (!req.file) {
    throw HttpError(400, "Please send the file");
  }
  const { _id } = req.user;
  const { path: oldPath } = req.file;
  const newPath = path.join(posterPath, "newfile.jpg");

  Jimp.read(oldPath, (err, lenna) => {
    if (err) throw err;
    lenna.resize(250, 250).quality(90).greyscale().write(newPath);
  });
  await fs.unlink(oldPath);
  cloudFunction();

  async function cloudFunction() {
    await new Promise((resolve) => setTimeout(resolve, 100));
    const { url } = await cloudinary.uploader.upload(newPath, {
      folder: "avatars",
    });
    await fs.unlink(newPath);
    const result = await userServices.updateUser({ _id }, { avatar: url });
    res.json({
      avatar: result.avatar
    });
  }
};

export default {
    updateProfile: controllerDecorator(updateProfile),
    updateTheme: controllerDecorator(updateTheme),
    updateAvatar: controllerDecorator(updateAvatar)
};