const users = require('../models/users')

let id = 1

module.exports = {
    login: (req, res, next) => {
        let isAUser = false;
        for (let i=0; i<users.length; i++) {
        if (req.body.username === users[i].username && req.body.password === users[i].password) {
          isAUser = true
        }
    }
    if (isAUser) {
        req.session.user.username = req.body.username
        res.status(200).send(req.session.user)
    } else {
    res.status(500).send('No User Found!')
    }
},

    register: (req, res, next) => {
        users.push({id: id, username: req.body.username, password: req.body.password})
        id++
        req.session.user.username = req.body.username
        res.status(200).send(req.session.user)
    },

    signout: (req, res, next) => {
        req.session.destroy()
        res.status(200).send(req.session)
    },

    getUser: (req, res, next) => {
        res.status(200).send(req.session.user)
    }
}