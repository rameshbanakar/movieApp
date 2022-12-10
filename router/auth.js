const express = require("express");
const {protect}=require("../middleware/auth")
const { signup, login,logout } = require("../controller/auth");
const router = express.Router();
router.route("/signup").post(signup);
router.route("/login").post(login);
router.route("/logout").get(protect,logout);
module.exports = router;
