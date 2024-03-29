const express = require('express')
const router = express.Router()
const { authorizeJWT } = require("../middlewares/authorizeJWT")
const chatController = require("../controllers/chat")

router.get("/chat/:chatId", authorizeJWT, chatController.getChat)
router.get("/getPublicChat", authorizeJWT, chatController.getPublicChat)

router.post("/chat/send", authorizeJWT, chatController.sendMessage)
router.post("/chat/create", authorizeJWT, chatController.createNewChat)
router.post("/chat/removeUser", authorizeJWT, chatController.removeUserFromChat)
router.post("/chat/editChatName", authorizeJWT, chatController.editChatName)
router.post("/chat/usersNotInChat", authorizeJWT, chatController.getUsersNotInChat)
router.post("/chat/addUsersToChat", authorizeJWT, chatController.addUsersToChat)
module.exports = router