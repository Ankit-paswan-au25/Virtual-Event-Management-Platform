const express = require('express');
const router = express.Router();
const events = require('../controller/eventController');
const routeGuard = require('../middleware/routeGuard');


router.route('/')
    .get(events.getAllEvent)
    .post(routeGuard, events.createEvent)

router.route('/:id')
    .get(events.getSingleEvent)
    .put(routeGuard, events.updateEvent)
    .delete(routeGuard, events.deleteEvent)
router.get('/:id/creator', routeGuard, events.creatorEvent)

module.exports = router