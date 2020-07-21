const NoteModel = require('../../models/NoteModel');


async function responseNotesToClient(req, res) {
    let noteList = await NoteModel.find({}).sort({
        favorite: -1,
        timeCreated: -1
    });
    noteList = JSON.stringify(noteList);
    res.setHeader('Content-Type', 'application/json');
    res.end(noteList);
}

module.exports = {
    get: async function (req, res) {
        responseNotesToClient(req, res);
    },
    post: async (req, res) => {
        let {
            _id,
            title,
            content,
        } = req.body;
        let newNote = new NoteModel({
            _id,
            title,
            content,
            timeCreated: new Date(),
            favorite: 1
        });

        await newNote.save();
        responseNotesToClient(req, res);
    },
    delete: async function (req, res) {
        let {
            id
        } = req.body;
        await NoteModel.deleteOne({
            _id: id
        });
        responseNotesToClient(req, res);
    },
    update: async function (req, res) {
        let {
            id,
            title,
            content,
            favorite
        } = req.body;

        let updateNote = {};
        if (title) {
            updateNote.title = title;
        }
        if (content) {
            updateNote.content = content;
        }
        if (favorite) {
            updateNote.favorite = favorite;
        }
        await NoteModel.findByIdAndUpdate(id, updateNote);
        responseNotesToClient(req, res);
    }
}