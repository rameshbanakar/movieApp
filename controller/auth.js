const User=require("../models/users")
const bcrypt=require("bcryptjs")
const jwt=require("jsonwebtoken")
exports.signup=async(req,res)=>{
    const {firstName,lastName,email,password}=req.body;
    let user=await User.findOne({email:email})
    if(user){
        return res.send("user already exist")
    }
    
    user=new User({
        firstName,
        lastName,
        email,
        password

    })
    const salt = await bcrypt.genSalt(10);
    hashPass = await bcrypt.hash(password, salt);
    user.password=hashPass;
    await user.save()
     sendTokenResponse(user, 200, res);
    
}
exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email});
  if (!user) {
    return res.send("user not found");
  }
  const isMatch = await bcrypt.compare( password,user.password);
  if (!isMatch) {
    return res.send("credentials not match");
  }
  sendTokenResponse(user,200,res)
};
exports.logout = async (req, res, next) => {
  // user is already available in req due to the protect middleware
  res.cookie("token", "none", {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    data: {},
  });
};


const sendTokenResponse = (user, statusCode, res) => {
  const payload = { user: { id: user.id } };
  const option = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXP * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };
  if (process.env.NODE_ENV === "production") {
    option.secure = true;
  }
  jwt.sign(payload, "jkvhkjsh", (err, token) => {
    if (err) {
      return res.send(err);
    } else {
      res.status(statusCode).cookie("token", token, option).json({
        success: true,
        token,
      });
    }
  });;
};