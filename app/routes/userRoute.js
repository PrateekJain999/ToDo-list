const jwt = require('jsonwebtoken');
const userService = require('../services/userService')
const { auth, joiValidation } = require('../middleware/userMiddleware')
const sendMail = require('../utils/emailService')
const commonFunctions = require('../utils/utils');
const express = require('express');
const router = new express.Router()

// generateAuthToken = async function (user) {

//     const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET)
//     user.tokens = user.tokens.concat({ token });

//     await userService.registerUser(user);
//     return token
// }

router.post('/users/signup', joiValidation, async (req, res) => {
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
})

router.post('/users/login', async (req, res) => {
    try {
        const user = await userService.getUser({ email: req.body.email })
        console.log(user)
        if (user) {
            if (commonFunctions.compareHash(req.body.password, user.password)) {

                const token = commonFunctions.encryptJwt({ _id: user._id.toString() })
                user.tokens = user.tokens.concat({ token });
                await userService.registerUser(user);

                delete user.password;
                delete user.tokens;

                res.send({ user, token })
            }
            throw new Error('password not same');
        }
        throw new Error('user not exists');
    } catch (e) {
        res.status(400).send(e.message)
    }
})

router.post('/users/logout', auth, async (req, res) => {
    try {
        // console.log(req)
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })
        userService.registerUser(req.user)

        res.send()
    } catch (e) {
        res.status(500).send()
    }
})

router.post('/users/logoutAll', auth, async (req, res) => {
    try {
        req.user.tokens = []
        await userService.registerUser(req.user);
        res.send()
    } catch (e) {
        res.status(500).send()
    }
})

router.get('/users/me', auth, async (req, res) => {
    res.send(req.user)
})

router.patch('/users/me', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['firstname', 'lastname', 'email', 'password', 'age', 'gender']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
        updates.forEach((update) => req.user[update] = req.body[update])
        await req.user.save()
        res.send(req.user)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.delete('/users/me', auth, async (req, res) => {
    try {
        await req.user.remove()
        sendMail({ name: `${req.user.firstname} ${req.user.lastname}`, to: req.user.email, text: 'Welcome Back Soon.', subject: 'Account Deleted' });
        res.send(req.user)
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router;