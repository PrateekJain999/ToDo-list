const MONGOOSE = require('mongoose');
const Schema = MONGOOSE.Schema;

const notesSchema = new Schema({
    userId: {type: Schema.Types.ObjectId, ref: 'users'},
    taskName: { type: String , required: true},
    content: { type: String , required: true}
}, {timestamps: true});

module.exports=MONGOOSE.model('notes', notesSchema);