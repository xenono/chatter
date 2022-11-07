const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

const port = 8080

const authRoutes = require("./routes/auth")

// Middlewares
app.use(bodyParser.json())
app.use(cookieParser())

app.use('/api',authRoutes);
app.listen(port, () => {
    console.log("Server has started on: http://localhost:" + port)
})