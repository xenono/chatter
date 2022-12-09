const mongoose = require("mongoose")
const {mongo} = require("mongoose");

const Schema = mongoose.Schema

const userSchema = new Schema ({
    username: {
        type: String,
        required:true
    },
    password: {
        type: String,
        required: true
    },
    profileImage: {
        type:String,
    },
    chats: [
        {
            _id: {
                type: Schema.Types.ObjectId
            },
            name: {
                type:String
            }
        }]
})

module.exports = mongoose.model("User",userSchema)