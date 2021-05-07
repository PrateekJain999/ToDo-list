const express = require('express');
const server = express();
const jwt = require('jsonwebtoken')
var bodyParser = require('body-parser')
const joiSchema = require('../services/joiValidation');
const userService = require('../services/userService')
const auth = require('../middleware/userMiddleware')
const router = new express.Router()

generateAuthToken = async function (user) {

    const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET)
    user.tokens = user.tokens.concat({token});

    await userService.registerUser(user);
    return token
}

validation = function (req, res, next) {
    req.body.gender = req.body.gender.toLowerCase();

    const data = joiSchema.validate(req.body);

    if (data.error) {
        res.end(data.error.message);
    }
    else {
        next();
    }
}


server.use(bodyParser.json())

router.post('/users/signup', validation, async (req, res) => {
    try {
        const user = await userService.registerUser(req.body);
        res.send(user);
    } catch (e) {
        res.status(400).send(e.message)
    }
})

router.post('/users/login', async (req, res) => {
    try {
        const user = await userService.loginUser(req.body)
        const token = await generateAuthToken(user);

        res.send({ user, token })
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

// router.post('/users/logoutAll', auth, async (req, res) => {
//     try {
//         req.user.tokens = []
//         await req.user.save()
//         res.send()
//     } catch (e) {
//         res.status(500).send()
//     }
// })

// router.get('/users/me', auth, async (req, res) => {
//     res.send(req.user)
// })

// router.patch('/users/me', auth, async (req, res) => {
//     const updates = Object.keys(req.body)
//     const allowedUpdates = ['name', 'email', 'password', 'age']
//     const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

//     if (!isValidOperation) {
//         return res.status(400).send({ error: 'Invalid updates!' })
//     }

//     try {
//         updates.forEach((update) => req.user[update] = req.body[update])
//         await req.user.save()
//         res.send(req.user)
//     } catch (e) {
//         res.status(400).send(e)
//     }
// })

// router.delete('/users/me', auth, async (req, res) => {
//     try {
//         await req.user.remove()
//         sendCancelationEmail(req.user.email, req.user.name)
//         res.send(req.user)
//     } catch (e) {
//         res.status(500).send()
//     }
// })

server.use(router)

module.exports = server;