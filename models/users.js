const mongoose=require("mongoose")
const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "please enter the first name"],
  },
  lastName: {
    type: String,
    required: [true, "please enter the first name"],
  },
  email: {
    type: String,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,"please enter the valid mail ID"],
  },
  password:{
    type:String,
    minlength:[6,"minimum password length should be more then 6"]
  }
});
const userModel=new mongoose.model("user",userSchema)
module.exports=userModel