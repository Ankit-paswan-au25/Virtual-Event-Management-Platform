const mongoose = require('mongoose');
const validator = require('validator');


const eventSchema = mongoose.Schema(
    {
        eventName: {
            type: String,
            required: [true, "Please enter event Name"]
        },
        dateOfEvent: {
            type: String,
            required: [true, 'Please Provide date of event'],

        },
        timeOfEvent: {
            type: String,
            required: [true, 'Please Provide starting time of event'],

        },
        seatInEvent: {
            type: Number,
            required: [true, 'Please Provide Estimated number of people'],

        },
        description: {
            type: String,
            required: [true, 'Please Provide Description of for what this event all about'],
            minlength: 8,
        },
        joinerId: {
            type: String,
            minlength: 8,
        },
        createdBy: {
            type: String,
            required: true,
        },
        venue: {
            type: String,
            required: true,
        },
        isLocked: {
            type: Boolean,
            default: false
        },
        isDeleted: {
            type: Boolean,
            dafault: false
        },
    },
    {
        timestamps: true,
    }
)

const event = mongoose.model("Event", eventSchema);
module.exports = event;