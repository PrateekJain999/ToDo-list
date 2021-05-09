const userModel = require('../models/userModel')
const commonFunctions = require('../utils/utils');

userService = {};

userService.registerUser = async (payload) => {
    // encrypt user's password and store it in the database.
    payload.password = commonFunctions.hashPassword(payload.password);
    return await userModel(payload).save();
};

/**
 * function to update user.
 */
userService.updateUser = async (criteria, dataToUpdate) => {
    return await userModel.findOneAndUpdate(criteria, dataToUpdate).lean();
};

/**
 * function to delete user.
 */
 userService.deleteUser = async (criteria) => {
    return await userModel.findOneAndRemove(criteria).lean();
};

/**
 * function to fetch user from the system based on criteria.
 */
userService.getUser = async (criteria, projection={}) => {
    return await userModel.findOne(criteria, projection).lean();
};

userService.getUsers = async (criteria) => {
    return await userModel.find(criteria)
};

module.exports = userService;