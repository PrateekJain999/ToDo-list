const jwt = require('jsonwebtoken');
const {userService, noteService} = require('../../services/index');
const { auth, joiValidation } = require('../../middleware/userMiddleware');
const {sendMail, joiSchema, commonFunctions} = require('../../utils/index');
const express = require('express');
const ObjectId = require('mongodb').ObjectId;
const noteRouters = express.Router();

noteRouters.post('/notes/create', auth, async (req, res) => {
    try {
        let note = await noteService.createNote({
            userId: req.user._id,
            taskName: req.body.taskName,
            content: req.body.content
        });

        res.send(note);
    } catch (e) {
        res.status(400).send(e.message)
    }
});

noteRouters.get('/notes/Read', auth, async (req, res) => {
    try {
        let id = new ObjectId(req.body.id);
        let note = await noteService.readNote({ _id: id, userId: req.user._id });
        res.send({ success: true, note });
    } catch (e) {
        res.status(500).send(e.message)
    }
});

noteRouters.get('/notes/Reads', auth, async (req, res) => {
    try {
        let note = await noteService.readNotes({userId: req.user._id});
        res.send({ success: true, note });
    } catch (e) {
        res.status(500).send(e.message)
    }
});

noteRouters.patch('/notes/update', auth, async (req, res) => {
    try {
        let id = new ObjectId(req.body.id);
        delete req.body.id;

        let note = await noteService.updateNote({ _id: id, userId: req.user._id }, req.body);
        console.log(note)
        res.json({ success: true, note });
    } catch (e) {
        res.status(400).end(e.message)

    }
});

noteRouters.delete('/notes/delete', auth, async (req, res) => {
    try {
        let id = new ObjectId(req.body.id);
        await noteService.deleteNote({ _id: req.user._id, _id: id });

        res.json({ success: true })
    } catch (e) {
        res.status(500).send(e.message)
    }
});

noteRouters.delete('/notes/deletes', auth, async (req, res) => {
    try {
        let ids = req.body.ids.map(id => new ObjectId(id));
        await noteService.deleteNotes(ids, req.user._id );
        res.send({ success: true });
    } catch (e) {
        res.status(500).send(e.message)
    }
});

module.exports = noteRouters;