const express = require('express')
const session = require('express-session')
const app = express()
const router = require('./router')
const MongoStore = require('connect-mongo')
const env = require('dotenv')
const flash = require('connect-flash')
env.config()
let sessionOptions = session({
    secret: "Frase Aleatoria",
    resave: false,
    store: MongoStore.create({
        mongoUrl: process.env.URL_BANCO,
    }),
    saveUninitialized: false,
    cookie: {
        maxAge: 60 * 1000 * 60,
        httpOnly: true
    }
})
app.use(sessionOptions)
app.use(express.urlencoded({
    extended: false
}))

app.use(flash())

app.use((req, res,next) =>{
    (req.session.user) ? req.visitorId = req.session.user._id : req.visitorId = 0


    // res.locals.user = req.session.user
    next()
})

app.use((req, res, next) => {
    res.locals.user = req.session.user
    next()
})
app.use(express.json())

app.set('views', 'views')
app.set('view engine', 'ejs')

app.use(express.static(__dirname + '/public'))

app.use(router)

module.exports = app