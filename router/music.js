const express = require("express");
const {
  getAllMusic,
  postMusic,
  updateMusic,
  deleteMusic,
  getMyMusic,
} = require("../controller/music");
const {protect}=require("../middleware/auth")
const router = express.Router();
router.route("/allmusic").get(getAllMusic);
router.route("/mymusic").get(protect,getMyMusic);
router.route("/mymusic").post(protect, postMusic);
router
  .route("/mymusic/:id")
  .put( updateMusic)
  .delete( deleteMusic);
module.exports = router;
