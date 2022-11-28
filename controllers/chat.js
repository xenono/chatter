const Chat = require('../models/chat')
exports.getPublicChat = async (req,res,next) => {
    const { chatId } = req.body
    try {
        const chat = await Chat.findById(chatId)
        res.status(200).json(chat)

    }catch(err){
        next(err)
    }
}

exports.sendMessage = async (req,res,next) => {
    const {chatId, username, content} = req.body
    try {
        const chat = await Chat.findById("638417c58d89fb527c37d96e")
        const message = {
            username,
            content,
            createdAt: Date.now()
        }
        chat.messages.push(message)
        await chat.save();
        res.status(200).json({status:200})

    } catch (err) {
        next(err)
    }
}