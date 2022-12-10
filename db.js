const mongoose=require("mongoose")
mongoose.set("strictQuery", true);
const dbConnect=async()=>{
    mongoose
      .connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
      })
      .then(() => {
        console.log("db connected successfully");
      })
      .catch((err) => {
        console.log(`error occured ${err}`);
      });
}
module.exports= dbConnect
