const jwt = require('jsonwebtoken');
const userService = require('../services/userService')
const moteService = require('../services/noteService')
const { auth, joiValidation } = require('../middleware/userMiddleware')
const sendMail = require('../utils/emailService')
const commonFunctions = require('../utils/utils');
const express = require('express');
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

router.post('/notes/update', auth, async (req, res) => {
    try {
        let user = await userService.getUser({ email: req.body.email });
        let tokens = user.tokens;

        if (user) {
            if (commonFunctions.compareHash(req.body.password, user.password)) {

                const token = commonFunctions.encryptJwt({ _id: user._id.toString() })
                tokens.push({ token });

                await userService.updateUser({ _id: user._id }, { tokens });

                delete user.password;
                delete user.tokens;

                res.json({ user, token })
            }
            else {
                throw new Error('password not same');
            }
        }
        else {
            throw new Error('user not exists');
        }
    } catch (e) {
        res.status(400).end(e.message)

    }
})

router.post('/notes/delete', auth, async (req, res) => {
    try {
        tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        });

        await userService.updateUser({ _id: req.user._id }, { tokens });

        res.json({ success: true })
    } catch (e) {
        res.status(500).send(e.message)
    }
})

router.post('/notes/Read', auth, async (req, res) => {
    try {
        tokens = []
        await userService.updateUser({ _id: req.user._id }, { tokens });
        res.send({ success: true });
    } catch (e) {
        res.status(500).send(e.message)
    }
})

router.get('/notes/Reads', auth, async (req, res) => {

    delete req.user.password;
    delete req.user.tokens;
    res.send(req.user)
})

module.exports = router;