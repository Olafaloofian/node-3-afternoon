const swag = require('../models/swag')

module.exports = {
    add: (req, res, next) => {
        const { cart } = req.session.user
        const { id } = req.query
        const index = cart.findIndex( swag => swag.id == id)
        if (index === -1) {
            const selected = swag.find(swag => swag.id == id)
            cart.push(selected)
            req.session.user.total += selected.price
            res.status(200).send(req.session.user)
        } else {
            res.status(200).send(req.session.user)
        }
    },
    delete: (req, res, next) => {
        const { cart } = req.session.user
        const { id } = req.query

        const selected = swag.find(item => item.id == id)
        if (selected) {
            const index = cart.findIndex(item => item.id == id)
            cart.splice(index, 1)
            req.session.user.total -= selected.price
        }
        res.status(200).send(req.session.user)
    },
    checkout: (req, res, next) => {
        req.session.user.cart = []
        req.session.user.total = 0
        res.status(200).send(req.session.user)
        }
}