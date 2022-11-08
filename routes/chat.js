const express = require('express')
const router = express.Router()
const { authorizeJWT } = require("../middlewares/authorizeJWT")
const chatController = require("../controllers/chat")

router.get("/chat/public", authorizeJWT, chatController.getPublicChat)

module.exports = router