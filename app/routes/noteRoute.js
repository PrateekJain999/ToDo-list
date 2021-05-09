const jwt = require('jsonwebtoken');
const userService = require('../services/userService')
const moteService = require('../services/noteService')
const { auth, joiValidation } = require('../middleware/userMiddleware')
const sendMail = require('../utils/emailService')
const commonFunctions = require('../utils/utils');
const express = require('express');
const ObjectId = require('mongodb').ObjectId;
const router = new express.Router()

router.post('/notes/create', auth, async (req, res) => {
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
})

router.patch('/notes/update', auth, async (req, res) => {
    try {
        let id = new ObjectId(req.body.id);
        delete req.body.id;

        let note = await noteService.updateNote({ _id: id, userId: req.user._id }, req.body);
        console.log(note)
        res.json({ success: true, note });
    } catch (e) {
        res.status(400).end(e.message)

    }
})

router.delete('/notes/delete', auth, async (req, res) => {
    try {
        let id = new ObjectId(req.body.id);
        await noteService.deleteNote({ _id: req.user._id, _id: id });

        res.json({ success: true })
    } catch (e) {
        res.status(500).send(e.message)
    }
})

router.get('/notes/Read', auth, async (req, res) => {
    try {
        let id = new ObjectId(req.body.id);
        let note = await noteService.readNote({ _id: id, userId: req.user._id });
        res.send({ success: true, note });
    } catch (e) {
        res.status(500).send(e.message)
    }
})

router.get('/notes/Reads', auth, async (req, res) => {
    try {
        let ids = req.body.ids.map(id => new ObjectId(id));
        let note = await noteService.readNotes(ids, req.user._id );
        res.send({ success: true, note });
    } catch (e) {
        res.status(500).send(e.message)
    }
})

module.exports = router;