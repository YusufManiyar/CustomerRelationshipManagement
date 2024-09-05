const express = require('express')
const contact = require('../controllers/contact.js')
const router = express.Router()

router.post('/createContact', contact.create)
router.get('/getContact', contact.getById)
router.post('/updateContact', contact.update)
router.post('/deleteContact', contact.delete)

module.exports = router