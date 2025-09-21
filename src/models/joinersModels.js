const mongoose = require('mongoose');


const joinerSchema = mongoose.Schema(
    {
        eventID: {
            type: String,
            required: [true, "Please enter your name"]
        },
        joiners: {
            type: Array,
        },

        isDeleted: {
            type: Boolean,
            dafault: false
        },
    },
    {
        timestamps: true
    }
)

const joiner = mongoose.model("Joiner", joinerSchema);
module.exports = joiner;