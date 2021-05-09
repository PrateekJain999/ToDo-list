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


/**
 * function to create new user into the system.
 */
// userService.createUser = async (payload) => {
//     // fetch initial rank type and rank value for new user. 
//     let defaultRankType = await rankTypeModel.findOne({ isDefault: true, isDeleted: false });
//     payload.rankType = defaultRankType._id;
//     payload.rankValue = defaultRankType.maxRank;
//     return await userModel(payload).save();
// };


// userService.addUsers = async (userIds, teacher_email) => {
//     return await userModel.aggregate([
//         { $match: { _id: { $in: userIds } } },
//         { $set: { assign_teacher: { $concatArrays: ['$assign_teacher', [teacher_email]] } } },
//         { $project: { assign_teacher: { $setIntersection: ["$assign_teacher", "$assign_teacher"] } } },
//         { $merge: { into: 'users' } }
//     ])
// };

module.exports = userService;