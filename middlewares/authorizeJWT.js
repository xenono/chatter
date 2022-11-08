const jwt = require('jsonwebtoken')
const dotenv = require("dotenv").config()

exports.authorizeJWT = (req, res, next) => {
    const token = req.cookies.token
    let decodedToken;
    try {
        decodedToken = jwt.verify(token, process.env.SecretJWT);
    }catch(err){
        res.cookie("isLoggedIn", false)
        res.cookie('token', token, {httpOnly: true, expires: new Date(Date.now())})
        err.statusCode = 500
        return next(err)
    }
    if(!decodedToken){
        const error = new Error("Token malformed, not authenticated!")
        res.cookie('isLoggedIn', false)
        error.statusCode = 500
        return next(error)
    }
    req.userId = decodedToken.userId
    next()
}