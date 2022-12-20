const express = require("express");
const router = express.Router();

const userController = require("../controllers/user")
const {authorizeJWT} = require("../middlewares/authorizeJWT");

router.post("/signup",userController.createUser)
router.get("/users",authorizeJWT, userController.getAllUsers)
module.exports = router