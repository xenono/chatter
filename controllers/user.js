const bcrypt = require('bcrypt')
const User = require("../models/user")
const Chat = require("../models/chat");
exports.createUser = async (req,res,next) => {
    const {username, password, confirmPassword} = req.body
    if(password !== confirmPassword){
        const error = new Error('Passwords must match.')
        error.statusCode = 400
        return next(error)
    }
    const userExist = await User.findOne({username})
    if(userExist){
        const error = new Error('User with this username already exists!')
        error.statusCode = 409
        return next(error)
    }
    try {
        const hashedPassword = await bcrypt.hash(password, 12)
        const chat = await Chat.findOne({name: "Public Chat"})

        const user = new User({
            username,
            password: hashedPassword,
            chats: [{_id: chat._id,name:chat.name}]
        })
        await user.save()
        res.status(200).json({status:200,message: "User has been created."})
    }catch(err){
        console.log(err.message)
        err.message = "Can't create a new user!"
        err.statusCode = 400;
        next(err)
    }
}