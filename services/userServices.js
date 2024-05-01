import User from '../schemas/mongooseModels/userModel.js';

export const findUser = (filter) => {
    return User.findOne(filter);
}

export const registerUser = (data) => {
    return User.create(data);
}

export const updateUser = (filter, data) => {
    return User.findOneAndUpdate(filter, data, { new: true });
}