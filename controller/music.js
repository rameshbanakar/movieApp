const Music=require("../models/music")
exports.getAllMusic = async (req, res) => {
    
  const musics = await Music.find();
  if (!musics) {
    return res.status(404).send("No music found");
  }
  res.send(musics);
};
exports.postMusic = async (req, res,next) => {
  req.body.user=req.user.id
   const music=await Music.create(req.body)
   music.save()
   res.send(music)
};
exports.updateMusic = async (req, res, next) => {
  const data={
    songName:req.body.songName,
    movieName:req.body.movieName,
    singers:req.body.singers
  }
  const music=await Music.findByIdAndUpdate(req.params.id,data,{
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    data: music,
  });
};

exports.deleteMusic = async (req, res, next) => {
 
  const music = await Music.findByIdAndDelete(req.params.id)
  res.status(200).json({
    success: true,
    data: {},
  });
};
exports.getMyMusic=async(req,res,next)=>{
  const music=await Music.find({user:req.user.id})
  if(!music){
    return res.send("no music found")
  }
  res.send(music)

}