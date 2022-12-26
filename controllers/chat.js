const Chat = require('../models/chat')
const User = require("../models/user")

exports.getPublicChat = async (req, res, next) => {
    try {
        const chat = await Chat.findOne({name: "Public Chat"})
        if (!chat) {
            const err = new Error("Chat not found!")
            err.statusCode = 404
            next(err)
        }
        res.status(200).json(chat)

    } catch (err) {

        next(err)
    }
}
exports.getChat = async (req, res, next) => {
    const {chatId} = req.params
    try {
        const chat = await Chat.findById(chatId)
        if (!chat) {
            const err = new Error("Chat not found!")
            err.statusCode = 404
            next(err)
        }
        res.status(200).json({chat})

    } catch (err) {
        next(err)
    }
}

exports.sendMessage = async (req, res, next) => {
    const {chatId, username, content} = req.body
    try {
        const chat = await Chat.findById(chatId)
        const message = {
            username,
            content,
            createdAt: Date.now()
        }
        chat.messages.push(message)
        await chat.save();
        res.status(200).json({status: 200})

    } catch (err) {
        next(err)
    }
}

exports.createNewChat = async (req, res, next) => {
    const {chatName, users} = req.body
    const allMembersIDs = users.map(user => user._id)
    allMembersIDs.push(req.userId)
    try {
        const creatorsName = (await User.findById(req.userId)).username
        const members = await User.find({_id:{$in:allMembersIDs}})

        const chat = new Chat({
            name: chatName,
            messages: [],
            members:[...users,{username:creatorsName,_id:req.userId}],
            admin:{
                username: creatorsName,
                _id: req.userId
            }
        })
        const newChat = await chat.save()
        for(const member of members){
            member.chats.push({_id:newChat._id,name:newChat.name})
            await member.save()
        }
        res.status(200).json({status:200,chat:{name:newChat.name,_id:newChat._id}})
    } catch (err) {
        next(err)
    }
}