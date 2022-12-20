const mongoose = require("mongoose")
const {mongo} = require("mongoose");

const Schema = mongoose.Schema

const chatSchema = new Schema ({
    name: {
        type: String,
        required:true,
    },
    admin: {
        username: {
            type:String,
            required:true
        },
        _id: {
            type: Object,
            required: true,
        }
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
        _id: {
            type: Object,
            required: true,
        },
        username: {
            type: String,
            required:true
        }
    }]
})

module.exports = mongoose.model("Chat",chatSchema)