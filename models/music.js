const mongoose=require("mongoose")
const musicSchema = new mongoose.Schema({
  songName: {
    type: String,
    required: [true, "Please enter the movie name"],
  },
  movieName: {
    type: String,
    required: [true, "Please enter the movie name"],
  },
  singers: {
    type: String,
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
});
const musicModel=new mongoose.model("music",musicSchema)
module.exports=musicModel;