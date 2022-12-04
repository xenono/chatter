const mongoose = require("mongoose")
const {mongo} = require("mongoose");

const Schema = mongoose.Schema

const chatSchema = new Schema ({
    name: {
        type: String,
        required:true,
    },
    messages: [{
        username: {
            type: String,
            required: true
        },
        content: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            required: true
        }

    }],
    members: [{
        userId: {
            type: Object,
            required: true,
        }
    }]
})

module.exports = mongoose.model("Chat",chatSchema)