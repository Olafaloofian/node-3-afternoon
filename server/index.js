const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const check = require('./middlewares/checkForSession')
const swagController = require('./controllers/swag_controller')
const authController = require('./controllers/auth_controller')
const cartController = require('./controllers/cart_controller')
const searchController = require('./controllers/search_controller')
require('dotenv').config();

const app = express()

app.use(bodyParser.json())
app.use(express.static(`${__dirname}/build`))

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))

app.use(check)

app.get('/api/swag', swagController.read)
app.post('/api/login', authController.login)
app.post('/api/register', authController.register)
app.post('/api/signout', authController.signout)
app.get('/api/user', authController.getUser)
app.post('/api/cart', cartController.add)
app.post('/api/cart/checkout', cartController.checkout)
app.delete('/api/cart', cartController.delete)
app.get('/api/search', searchController.search)


const PORT = 3000
app.listen(PORT, () => console.log(`SERVER IS LISTENING HERE: PORT ${PORT}`))


