const express = require('express')
const { register } = require('../controller/auth')
const router = express.Router()


router.get('/healthCheck', (req, res) => {
    res.sendStatus(200)
})


router.post('/register', register)


module.exports = router