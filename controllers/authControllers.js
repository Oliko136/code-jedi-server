import * as userServices from "../services/userServices.js";
import HttpError from "../helpers/HttpError.js";
import bcrypt from "bcrypt";
import controllerDecorator from "../helpers/controllerDecorator.js";
import jwt from "jsonwebtoken";
import path from "path";

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

export default {
  register: controllerDecorator(register),
  login: controllerDecorator(login),
  getCurrentUser: controllerDecorator(getCurrentUser),
  logout: controllerDecorator(logout)
};
