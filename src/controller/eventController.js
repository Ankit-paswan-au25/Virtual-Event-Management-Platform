const Event = require('../models/eventsModels')
const joiner = require('../models/joinersModels')
const asyncErrorHandler = require('../utils/catchAsyncError')
const AppError = require('../utils/appError')

const createEvent = asyncErrorHandler(async (req, res, next) => {
    /*eventName dateOfEvent timeOfEvent seatInEvent description */

    const { eventName, dateOfEvent, timeOfEvent, seatInEvent, description, createdBy, venue } = req.body
    if (!eventName || !dateOfEvent || !timeOfEvent || !seatInEvent || !description || !createdBy, !venue) {
        return next(new AppError('Please fill all the fields', 400))
    }
    const newEvent = {
        eventName: eventName,
        dateOfEvent: dateOfEvent,
        timeOfEvent: timeOfEvent,
        seatInEvent: seatInEvent,
        description: description,
        createdBy: createdBy,
        venue: venue
    }

    const createdEvent = await Event.create(newEvent)


    res.status(200).send({
        status: "success",
        data: createdEvent
    })

})

const getAllEvent = asyncErrorHandler(async (req, res, next) => {

    //finding all event
    const allEvent = await Event.find()


    //if no event found
    if (!allEvent) {
        return next(new AppError('no event found', 404))
    }


    res.status(200).send({
        status: "success",
        total: allEvent.length,
        data: allEvent

    })
})


const getSingleEvent = asyncErrorHandler(async (req, res, next) => {
    const eventId = req.params.id

    const theEvent = await Event.findById(eventId)

    if (!theEvent) {
        return next(new AppError('No event Found by this id', 404))
    }



    res.status(200).send({
        status: "success",
        data: theEvent
    })
})

const updateEvent = asyncErrorHandler(async (req, res, next) => {
    const eventId = req.params.id;
    const { eventName, dateOfEvent, timeOfEvent, seatInEvent, description } = req.body;

    if (!eventName && !dateOfEvent && !timeOfEvent && !seatInEvent && !description) {
        return next(new AppError('please fill atleast one field to update', 400));
    }

    const updateEvent = {};

    if (eventName) updateEvent.eventName = eventName;
    if (dateOfEvent) updateEvent.dateOfEvent = dateOfEvent;
    if (timeOfEvent) updateEvent.timeOfEvent = timeOfEvent;
    if (seatInEvent) updateEvent.seatInEvent = seatInEvent;
    if (description) updateEvent.description = description;

    const updated = await Event.findByIdAndUpdate(eventId, updateEvent, { new: true });

    res.status(200).send({
        status: "success",
        data: updated
    });
});


const deleteEvent = asyncErrorHandler(async (req, res, next) => {
    const eventId = req.params.id;
    const theEvent = await Event.findByIdAndDelete(eventId);

    if (!theEvent) {
        return next(new AppError('No event found with this ID', 404));
    }

    res.status(200).send({
        status: "success",
        data: "event deleted"
    });
});


const creatorEvent = asyncErrorHandler(async (req, res, next) => {

    const creatorID = req.params.id
    const allEvents = await Event.find({
        createdBy: creatorID
    })

    if (!allEvents) {
        next(new AppError('nothing found created by you', 404))
    }




    res.status(200).send({
        status: "success",
        total: allEvents.length,
        data: allEvents
    })
})

module.exports = {
    createEvent,
    getAllEvent,
    getSingleEvent,
    updateEvent,
    deleteEvent,
    creatorEvent
}