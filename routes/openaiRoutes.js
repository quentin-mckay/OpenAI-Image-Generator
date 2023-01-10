const express = require('express')
const router = express.Router()

// bring in generateImage controller function
const { generateImage } = require('../controllers/openaiController')


router.post('/generateimage', generateImage)


module.exports = router