import * as userServices from "../services/userServices.js";
import HttpError from "../helpers/HttpError.js";
import bcrypt from "bcrypt";
import controllerDecorator from "../helpers/controllerDecorator.js";
import jwt from "jsonwebtoken";
import fs from "fs/promises";
import path from "path";
import cloudinary from "../helpers/cloudinary.js";
import Jimp from "jimp";
const posterPath = path.resolve("images", "public", "avatar");

const { JWT_SECRET } = process.env;

const register = async (req, res) => {
  const { email, password } = req.body;
  const avatar = path.join("avatar/standartAvatar.png");
  const user = await userServices.findUser({ email });
  if (user) {
    throw HttpError(409, "Email in use");
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const newUser = await userServices.registerUser({
    ...req.body,
    avatar,
    password: hashPassword,
  });
  //* Auto load: after registration get token
  const { _id: id } = newUser;

  const token = jwt.sign({ id }, JWT_SECRET, { expiresIn: "23h" });
  await userServices.updateUser({ _id: id }, { token });
  //*
  res.status(201).json({
    token,
    name: newUser.name,
    email: newUser.email,
    avatar: newUser.avatar,
    theme: newUser.theme,
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await userServices.findUser({ email });
  if (!user) {
    throw HttpError(401, "Email or password invalid");
  }
  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw HttpError(401, "Email or password invalid");
  }
  const { _id: id, name, avatar, theme } = user;
  // if (user.token) {
  //   throw HttpError(409, "you already login");
  // }
  const payload = {
    id,
  };
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "23h" });
  await userServices.updateUser({ _id: id }, { token });
  res.json({
    token,
    user: { name, email, avatar, theme },
  });
};

const updateAvatar = async (req, res) => {
  if (!req.file) {
    throw HttpError(400, "Please send the file");
  }
  const { _id, name, email, theme } = req.user;
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
    res.json({ name, email, avatar: result.avatar, theme });
  }
};

const updateTheme = async (req, res) => {
  const { theme } = req.body;
  const { email } = req.user;
  const user = await userServices.findUser({ email });
  if (!user) {
    throw HttpError(404, "User not found");
  }

  const result = await userServices.updateUser({ email }, { theme });

  res.json(result);
};

const getCurrentUser = async (req, res) => {
  const { name, email, theme } = req.user;

  res.json({
    name,
    email,
    theme,
  });
};

const logout = async (req, res) => {
  const { _id } = req.user;
  await userServices.updateUser({ _id }, { token: null });
  res.status(204).json();
};

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
  res.json(result);
};

export default {
  register: controllerDecorator(register),
  login: controllerDecorator(login),
  updateTheme: controllerDecorator(updateTheme),
  getCurrentUser: controllerDecorator(getCurrentUser),
  updateAvatar: controllerDecorator(updateAvatar),
  logout: controllerDecorator(logout),
  updateProfile: controllerDecorator(updateProfile),
};
