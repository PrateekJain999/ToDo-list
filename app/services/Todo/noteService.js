const {userModel, noteModel} = require('../../models/index');
const commonFunctions = require('../../utils/utils');

noteService = {};

noteService.createNote = async (payload) => {
    return await noteModel(payload).save();
};

/**
 * function to update note.
 */
noteService.updateNote = async (criteria, dataToUpdate) => {
    return await noteModel.findOneAndUpdate(criteria, dataToUpdate,{upsert: true, new: true});
};

/**
 * function to delete note.
 */
noteService.deleteNote = async (criteria) => {
    return await noteModel.findOneAndRemove(criteria).lean();
};

/**
 * function to delete note.
 */
 noteService.deleteNotes = async (ids, userId) => {
    return await noteModel.remove({_id: {$in: ids}, userId});
};

/**
 * function to read one note.
 */
noteService.readNote = async (criteria, projection = {}) => {
    return await noteModel.findOne(criteria, projection).lean();
};

/**
 * function to read notes.
 */
noteService.readNotes = async (ids, userId) => {
    return await noteModel.aggregate([{$match:{$and: [ {_id: {$in: ids}}, {userId: userId} ] } }])

};

module.exports = noteService;