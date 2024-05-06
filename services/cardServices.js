import Card from "../schemas/mongooseModels/cardModel.js";

export const createCard = (body) => Card.create(body);
