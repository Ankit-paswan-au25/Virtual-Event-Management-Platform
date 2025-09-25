const express = require('express');
const router = express.Router();
const joiners = require('../controller/joinerController');
const routeGuard = require('../middleware/routeGuard');


router.get('/event/:id/joiner', joiners.allJoinerByEvent)
router.get('/joiner/:id/event', joiners.allEventByJoiner)
router.post('/join', joiners.joinInEvent)
router.delete('/remove', joiners.removeFromEvent)


module.exports = router