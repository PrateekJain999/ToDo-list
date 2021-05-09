const jwt = require('jsonwebtoken');
const {userService, noteService} = require('../../services/index');
const { auth, joiValidation } = require('../../middleware/userMiddleware')
const sendMail = require('../../utils/emailService')
const commonFunctions = require('../../utils/utils');
const express = require('express');
const userRouters = new express.Router()

userRouters.post('/users/signup', joiValidation, async (req, res) => {
    try {
        const User = await userService.getUser({ email: req.body.email });

        if (User) {
            throw new Error('user Already exists');
        }

        const user = await userService.registerUser(req.body);
        sendMail({ name: `${user.firstname} ${user.lastname}`, to: user.email, text: 'Thank For Subscribing us.', subject: 'welcome' });
        res.send(user);
    } catch (e) {
        res.status(400).send(e.message)
    }
});

userRouters.post('/users/login', async (req, res) => {
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
});

userRouters.post('/users/logout', auth, async (req, res) => {
    try {
        tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        });

        await userService.updateUser({ _id: req.user._id }, { tokens });

        res.json({ success: true })
    } catch (e) {
        res.status(500).send(e.message)
    }
});

userRouters.post('/users/logoutAll', auth, async (req, res) => {
    try {
        tokens = []
        await userService.updateUser({ _id: req.user._id }, { tokens });
        res.send({ success: true });
    } catch (e) {
        res.status(500).send(e.message)
    }
});

userRouters.get('/users/me', auth, async (req, res) => {

    delete req.user.password;
    delete req.user.tokens;
    res.send(req.user)
});

userRouters.patch('/users/me', auth, async (req, res) => {

    const updates = Object.keys(req.body)
    const allowedUpdates = ['firstname', 'lastname', 'email', 'password', 'age', 'gender']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).json({ error: 'Invalid updates!' })
    }

    try {
        let user = await userService.updateUser({ _id: req.user._id }, req.body);

        delete user.tokens;
        delete user.password;

        res.json({ success: true, user })
    } catch (e) {
        res.status(400).send(e.message)
    }
});

userRouters.delete('/users/me', auth, async (req, res) => {
    try {
        await userService.deleteUser({ _id: req.user._id });
        sendMail({ name: `${req.user.firstname} ${req.user.lastname}`, to: req.user.email, text: 'Welcome Back Soon.', subject: 'Account Deleted' });
        res.json({ success: true })
    } catch (e) {
        res.status(500).send(e.message)
    }
});

module.exports = userRouters;