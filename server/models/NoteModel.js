const mongoose = require('mongoose');
const schema = mongoose.Schema;


const noteSchema = new schema({
    _id: String,
    title: String,
    content: String,
    timeCreated: Date,
    favorite: Number
})

const NoteModel = mongoose.model('NoteModel', noteSchema);

module.exports = NoteModel;