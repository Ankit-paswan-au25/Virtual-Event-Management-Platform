const express = require('express');
const router = express.Router()
const joiners = require('../controller/joinerController')


router.post('/join', joiners.joinInEvent)
router.post('/remove', joiners.removeFromEvent)

module.exports = router