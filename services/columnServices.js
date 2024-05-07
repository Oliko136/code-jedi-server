import Column from "../schemas/mongooseModels/columnModel.js";

export const createColumn = (body) => Column.create(body);
