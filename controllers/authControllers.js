import * as userServices from "../services/userServices.js";
import HttpError from "../helpers/HttpError.js";
import bcrypt from "bcrypt";
import controllerDecorator from "../helpers/controllerDecorator.js";
import jwt from "jsonwebtoken";
const { JWT_SECRET } = process.env;

const register = async (req, res) => {
  const { email, password } = req.body;

  const user = await userServices.findUser({ email });
  if (user) {
    throw HttpError(409, "Email in use");
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const newUser = await userServices.registerUser({
    ...req.body,
    password: hashPassword,
  });

  res.status(201).json({
    name: newUser.name,
    email: newUser.email,
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
  const { _id: id, name, theme } = user;
  if (user.token) {
    throw HttpError(409, "you already login");
  }
  const payload = {
    id,
  };
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "23h" });
  await userServices.updateUser({ _id: id }, { token });
  res.json({
    token,
    user: { name, email, theme },
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

  res.json(result);
}

const getCurrentUser = async (req, res) => {
  const { name, email, theme } = req.user;

  res.json({
    name,
    email,
    theme
  })
}

export default {
  register: controllerDecorator(register),
  login: controllerDecorator(login),
  updateTheme: controllerDecorator(updateTheme),
  getCurrentUser: controllerDecorator(getCurrentUser),
};
