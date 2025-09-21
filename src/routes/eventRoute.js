const express = require('express');
const router = express.Router();
const events = require('../controller/eventController');
const routeGuard = require('../middleware/routeGuard');


router.route('/')
    .get(events.getAllEvent)
    .post(events.createEvent)

router.route('/:id')
    .get(events.getSingleEvent)
    .put(events.updateEvent)
    .delete(events.deleteEvent)

module.exports = router