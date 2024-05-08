import Card from "../schemas/mongooseModels/cardModel.js";

export const createCard = (body) => Card.create(body);

export const getAllCards = (filter) =>
  Card.find(filter).populate("column", "title");

export const countCards = (filter) => Card.countDocuments(filter);

export const getCardByFilter = (filter) => Card.findOne(filter);

export const updateCard = (filter, body) => Card.findOneAndUpdate(filter, body);

export const deleteCard = (filter) => Card.findOneAndDelete(filter);
