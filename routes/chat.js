const express = require('express')
const router = express.Router()
const { authorizeJWT } = require("../middlewares/authorizeJWT")
const chatController = require("../controllers/chat")

router.get("/chat", authorizeJWT, chatController.getChat)
router.get("/getPublicChat", authorizeJWT, chatController.getPublicChat)

router.post("/chat/send", authorizeJWT, chatController.sendMessage)

module.exports = router