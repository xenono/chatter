const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const dotenv = require("dotenv").config()
const app = express()
const port = 8080

const authRoutes = require("./routes/auth")
const chatRoutes = require("./routes/chat")

// Middlewares
app.use(bodyParser.json())
app.use(cookieParser())

app.use('/api', authRoutes);
app.use('/api', chatRoutes);

// Handle errors
app.use((error,req,res,next) => {
    const statusCode = error.statusCode || 500;
    const message = error.message || "An error occurred, no message";
    res.status(statusCode).json({type: "Error", status:statusCode, message})
})
app.listen(port, () => {
    console.log("Server has started on: http://localhost:" + port)
})