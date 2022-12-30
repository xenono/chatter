const Chat = require("../models/chat")
const io = require("../socket")
exports.onConnection = async socket => {
    const publicChat = await Chat.findOne({name: "Public Chat"})
    socket.join(publicChat._id.toString())
    console.log("Client connected")
}