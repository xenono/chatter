const Chat = require("../models/chat")
const io = require("../socket")
exports.onConnection = async socket => {
    const publicChat = await Chat.findOne({name: "Public Chat"})
    socket.join(publicChat._id.toString())
    socket.on('updateChat',(data,cb) => {
        socket.leave(data.oldChatId)
        socket.join(data.newChatId)
        cb({status:200})
    })
    console.log("Client connected")
}

const onChatUpdate = (data,cb) => {
    console.log(data)
    cb({status:200})
}