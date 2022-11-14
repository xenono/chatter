const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const dotenv = require("dotenv").config()
const app = express()
const port = 8080

const authRoutes = require("./routes/auth")
const chatRoutes = require("./routes/chat")
const userRoutes = require("./routes/user")

// Middlewares
app.use(bodyParser.json())
app.use(cookieParser())

app.use('/api', authRoutes);
app.use('/api', chatRoutes);
app.use('/api', userRoutes);

// Handle errors
app.use((error,req,res,next) => {
    const statusCode = error.statusCode || 500;
    const message = error.message || "An error occurred, no message";
    res.status(statusCode).json({type: "Error", status:statusCode, message})
})

mongoose.connect(process.env.MongoDBConnection, {
    useNewUrlParser:true,
    useUnifiedTopology:true,
}).then(() => {
    const server = app.listen(process.env.PORT || 8080)
    console.log("Server has started and connection to the database has been established.")
}).catch(err => {
    console.log(err)
})