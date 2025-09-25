const asyncErrorHandler = require('../utils/catchAsyncError');
const AppError = require('../utils/appError')
const Event = require('../models/eventsModels')
const joiner = require('../models/joinersModels')

const joinInEvent = asyncErrorHandler(async (req, res, next) => {
    // getting data from request 
    const { eventId, joinerId } = req.body

    //if joiner not found
    if (!joinerId) {
        next(new AppError('no joiner found', 404))
    }

    //getting event details
    const existingEvent = await Event.findById(eventId)// Event.find({ _id: eventID })

    // checking event is available for booking or not
    if (!existingEvent || existingEvent.isLocked) {
        return next(new AppError('contact admin event is locked', 400))
    }

    // checking if already joined same event
    let isAlreadyExist = await joiner.findOne({ eventID: eventId, joiners: joinerId, isDeleted: false })
    if (isAlreadyExist) {
        return next(new AppError('you are already in this event', 409))
    }

    const newJoinee = await joiner.create({ eventID: eventId, joiners: joinerId, isDeleted: false })

    res.status(200).send({
        status: "success",
        data: newJoinee

    })

})

const removeFromEvent = asyncErrorHandler(async (req, res, next) => {

    const { eventId, joinerId } = req.body



    const existingjoiner = await joiner.findOneAndDelete({ eventID: eventId, joiners: joinerId })


    res.status(200).send({
        status: "success",
        data: 'you are out from this event'

    })

})

const allEventByJoiner = asyncErrorHandler(async (req, res, next) => {
    //getting joiner Id
    const joinerId = req.params.id

    //finding Events for user
    const events = await joiner.find({ joiners: joinerId })
    if (!events) {
        return next(AppError('No Events found for you', 404))
    }
    //responsing
    res.status(200).send({
        status: 'success',
        data: events
    })

})
const allJoinerByEvent = asyncErrorHandler(async (req, res, next) => {
    //getting EventId
    const EventId = req.params.id

    //finding joiners
    const joiners = await joiner.find({ eventID: EventId })

    if (!joiners) {
        return next(AppError('No Joiners found', 404))
    }

    //responsing
    res.status(200).send({
        status: 'success',
        data: joiners
    })

})


module.exports = {
    joinInEvent,
    removeFromEvent,
    allEventByJoiner,
    allJoinerByEvent
}