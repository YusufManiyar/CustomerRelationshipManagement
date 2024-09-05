const express = require('express')
const { call, msg} = require('../controllers/ivr.js')
const router = express.Router()

router.post('/call', call)
router.post('/handle-key', msg)

module.exports = router