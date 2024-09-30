import userModel from "../model/userModel.js"; 
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs";
import validator from  "validator";


//login
const loginUser = async (req,res) => {
  const {email,password} = req.body;
  try{
    const user = await userModel.findOne({email});

    if (!user) {
      return res.json({success:false,message:"User Doesn't exist"})
    }
    const isMatch  = await bcrypt.compare(password,user.password);
     if(!isMatch) {
      return res.json({success:false,message:"Invalid Password"})
     }
    const token = creatToken(user._id);
    res.json({success:true,token})
  } catch (error) {
    console.log(error);
    res.json({success:false,message:"Error"})
  } 

}

const creatToken = (id) => {
  return jwt.sign({id},process.env.JWT_SECRET)
}


// Register user
const registerUser = async (req, res) => {
  const { name, password, email } = req.body;
  try {
   
    const exists = await userModel.findOne({ email });
    if (exists) {
      return res.json({ success: false, message: "User already exists" });
    }

    // Validate email
    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Please enter a valid email" });
    }

    // Validate password length
    if (password.length < 8) {
      return res.json({ success: false, message: "Password must be at least 8 characters long" });
    }
   // Hash the password
   const salt = await bcrypt.genSalt(10);
   const hashedPassword = await bcrypt.hash(password, salt);
    
   const newUser = new userModel({
    name: name,
    email: email,
    password: hashedPassword,
  });

  const user = await newUser.save();
  const token = creatToken(user._id)
  res.json({success:true,token});
} catch (error) {
    console.log(error);
    res.json({success:false,message:"Error"})
}
  
  }
export {loginUser,registerUser}