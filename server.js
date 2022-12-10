const express=require("express")
const app=express()
const dotenv = require("dotenv");
const music=require("./router/music")
const auth = require("./router/auth");
const cookieParser = require("cookie-parser");
const dbConnect =require("./db")
dotenv.config({ path: "./config/config.env" });
dbConnect()
app.use(cookieParser());
app.use(express.json())
app.use("/api/music", music);
app.use("/api/auth", auth);

app.get("/",(req,res)=>{
    res.send("hello")
})
const port=process.env.PORT||5000
app.listen(port, () => {
  console.log("server listening");
});