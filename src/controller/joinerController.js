const asyncErrorHandler = require('../utils/catchAsyncError');
const AppError = require('../utils/appError')
const Event = require('../models/eventsModels')
const joiner = require('../models/joinersModels')

const joinInEvent = asyncErrorHandler(async (req, res, next) => {
    const eventID = req.body.eventId
    const joinerId = req.body.joinerId
    if (!joinerId || joinerId.length <= 0) {
        next(new AppError('no joiner found', 404))
    }

    const existingEvent = await Event.findById(eventID)

    if (!existingEvent) {
        next(new AppError('event not exist', 404))
    }
    if (existingEvent.isLocked) {
        return next(new AppError('event out of ticket', 400))
    }

    if (existingEvent.joiners) {
        let existingjoiner = await joiner.findById(existingEvent.joiners)

        existingjoiner.joiner = [...existingjoiner.joiner, ...joinerId]
        let updatingjoiner = await joiner.findByIdAndUpdate(existingEvent.joiners, existingjoiner)
    } else {
        let newParticipants = {
            eventID: eventID,
            joiners: joinerId
        }

        let newJoiner = await joiner.create(newParticipants)
    }
    const updatedEvent = await Event.findById(eventID)
    res.status(200).send({
        status: "success",
        data: updatedEvent

    })

})

const removeFromEvent = asyncErrorHandler(async (req, res, next) => {

    const userId = req.body.eventId
    const joinerId = req.body.joinerId

    const existingjoiner = await joiner.findById(joinerId)

    if (existingjoiner.joiner.includes(userId)) {
        removeParticipant = existingjoiner.joiner.indexOf(userId)
        existingjoiner.joiner = existingjoiner.joiner.splice(indexToRemove, 1);
        let updatingjoiner = await joiner.findByIdAndUpdate(joinerId, existingjoiner)
    }

    const updatedEvent = await Event.findById(eventID)
    res.status(200).send({
        status: "success",
        data: updatedEvent

    })

})



module.exports = {
    joinInEvent,
    removeFromEvent
}