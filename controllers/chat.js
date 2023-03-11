const Chat = require('../models/chat')
const User = require("../models/user")
const io = require("../socket")

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
        io.getIO().to(chat._id.toString()).emit("updateChat", {chatId: chat._id.toString()})

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
        const members = await User.find({_id: {$in: allMembersIDs}})

        const chat = new Chat({
            name: chatName,
            messages: [],
            members: [...users, {username: creatorsName, _id: req.userId}],
            admin: {
                username: creatorsName,
                _id: req.userId
            }
        })
        const newChat = await chat.save()
        for (const member of members) {
            member.chats.push({_id: newChat._id, name: newChat.name})
            await member.save()
        }
        res.status(200).json({status: 200, chat: {name: newChat.name, _id: newChat._id}})
    } catch (err) {
        next(err)
    }
}

exports.removeUserFromChat = async (req, res, next) => {
    const {chatId, userId} = req.body
    try {
        const user = await User.findById(userId)
        const chat = await Chat.findById(chatId)
        console.log(chatId, userId)
        chat.members = chat.members.filter(({_id}) => _id.toString() !== userId)
        user.chats = user.chats.filter(({_id}) => _id.toString() !== chatId)
        await chat.save()
        await user.save()
        res.status(200).json({status: 200})
    } catch (err) {
        next(err)
    }
}

exports.editChatName = async (req, res, next) => {
    const {chatId, newChatName} = req.body
    try {
        const chat = await Chat.findById(chatId)
        chat.name = newChatName
        await chat.save()
        for (const member of chat.members) {
            const user = await User.findById(member._id)
            user.chats.find((c, i) => {
                if (chat._id.toString() === c._id.toString()) {
                    user.chats[i].name = newChatName
                }
            })

            await user.save()
        }
        res.status(200).json({status: 200})
    } catch (err) {
        next(err)
    }
}

exports.getUsersNotInChat = async (req,res,next) => {
    const {chatId} = req.body
    try {
        const chat = await Chat.findById(chatId)
        const users = await User.find({},{_id:1,username:1})
        const usersInChat = chat.members.map(({_id}) => _id)
        const usersNotInChat = users.filter(({_id}) => !usersInChat.includes(_id.toString()))
        res.status(200).json({status: 200, users:usersNotInChat})
    }catch (err){
        next(err)
    }
}

exports.addUsersToChat = async (req,res,next) => {
    const {chatId, users} = req.body
    try {
        const chat = await Chat.findById(chatId)
        chat.members = [...users,...chat.members]
        await chat.save()
        for(const user of users){
            const userObj = await User.findById(user._id)
            userObj.chats.push({_id:chat._id,name:chat.name})
            await userObj.save()
        }
        res.status(200).json({status:200})
    }catch(err){
        next(err)
    }
}