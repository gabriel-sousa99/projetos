const express = require('express')
const router = express.Router()
const userController = require('./controllers/userController')

router.post("/login",userController.login)

router.get('/',userController.home)

router.post("/registrar",userController.registrar)

module.exports = router