const {userModel, noteModel} = require('../../models/index');
const commonFunctions = require('../../utils/utils');

userService = {};

/**
 * function to register user.
 */
userService.registerUser = async (payload) => {
    // encrypt user's password and store it in the database.
    payload.password = commonFunctions.hashPassword(payload.password);
    return await userModel(payload).save();
};

/**
 * function to update user.
 */
userService.updateUser = async (criteria, dataToUpdate) => {
    return await userModel.findOneAndUpdate(criteria, dataToUpdate,{upsert: true, new: true}).lean();
};

/**
 * function to delete user.
 */
 userService.deleteUser = async (criteria) => {
    return await userModel.findOneAndRemove(criteria).lean();
};

/**
 * function to fetch user with criteria.
 */
userService.getUser = async (criteria, projection={}) => {
    return await userModel.findOne(criteria, projection).lean();
};

/**
 * function to get user.
 */
userService.getUsers = async (criteria) => {
    return await userModel.find(criteria)
};

module.exports = userService;