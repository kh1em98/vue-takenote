'use strict'
module.exports = function (app) {
    let notesCtrl = require('./controllers/NotesController');

    app.route('/notes')
        .get(notesCtrl.get)
        .post(notesCtrl.post)
        .put(notesCtrl.update)
        .delete(notesCtrl.delete)

}