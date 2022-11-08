const jwt = require("jsonwebtoken")
const dotenv = require("dotenv")
exports.login = async (req,res,next) => {
    console.log("xd")
    const {username, password} = req.body;
    const userId = username + password;
    let token;
    if(username === "1234" && password === "1234"){
        try {
            token = jwt.sign({userId},process.env.SecretJWT,{expiresIn: "1h"})
            res.cookie('token', token, {httpOnly:true})
            res.cookie('isLoggedIn', true)
            res.status(200).json({status: "success"})
        }catch(err){
            res.send("error " + err.message)
        }
    }
}

exports.logout = (req,res,next) => {
    const token = req.cookies.token
    res.cookie("isLoggedIn", false);
    res.cookie('token',token, {httpOnly: true, expires: new Date(Date.now())})
    res.status(200).json({status: 200, message: "Logged out successfully"})
}