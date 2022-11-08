const express = require("express");
const router = express.Router();

const authController = require("../controllers/auth")
const {authorizeJWT} = require("../middlewares/authorizeJWT");

router.post("/login",authController.login)
router.post("/logout",authorizeJWT, authController.logout)

module.exports = router