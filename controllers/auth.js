const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const User = require("../models/user")
const Chat = require("../models/chat");

const HOUR = 60*60*1000
const MINUTE = 60*1000
const SECOND = 1000
exports.login = async (req, res, next) => {
    const {username, password} = req.body;
    let token;
    try {
        const user = await User.findOne({username})
        if(!user){
            const err = new Error("User does not exist!")
            err.statusCode = 401
            return next(err)
        }
        const isPasswordEqual = await bcrypt.compare(password,user.password)
        if(!isPasswordEqual){
            const err = new Error("Wrong Credentials!")
            err.statusCode = 404
            return next(err)
        }
        token = jwt.sign({userId:user._id}, process.env.SecretJWT, {expiresIn: "1h"})
        res.cookie('token', token, {httpOnly: true, maxAge: HOUR})
        res.cookie('isLoggedIn', true, {maxAge: HOUR})
        res.status(200).json({status: 200, user: {_id: user._id, username: user.username},chats:user.chats})
    } catch (err) {
        res.send("error " + err.message)
    }

}

exports.logout = (req, res, next) => {
    const token = req.cookies.token
    res.cookie("isLoggedIn", false);
    res.cookie('token', token, {httpOnly: true, maxAge: 0})
    res.status(200).json({status: 200, message: "Logged out successfully"})
}

exports.authorize = async (req,res,next) => {
    const token = req.cookies.token
    const payload = jwt.verify(token, process.env.SecretJWT)

    try {
        const chat = await Chat.findOne({name: "Public Chat"})
        const {_id, username, chats} = await User.findById(payload.userId)
        res.status(200).json({status:200,_id,username,chats,activeChat:chat})

    }catch(err){
        next(err)
    }
}