import User from "../models/userModel.js"
import asyncHandler from "express-async-handler";
import generateToken from "../config/jwToken.js";

const createUser = asyncHandler(async (req, res) => {
  
      const { email } = req.body;
      try {
        const user = await User.findOne({ email });
        if (!user) {
          const createdUser = await User.create(req.body);
          res.json(createdUser);
        }else{
          throw new Error("user already exists");
        }
      }catch(err) {
        throw new Error(err);

      }
  });

  // login user 

  const loginUser = asyncHandler(async (req,res) => {
    const {email,password} = req.body;
    console.log(email,password);
    try{
   const findUser = await User.findOne({ email });
   if(findUser && findUser.isPasswordMatch(password)){
     res.json({
      _id: findUser.id,
      firstName: findUser.firstName,
      lastName: findUser.lastName,
      email: findUser.email,
      mobile: findUser.mobile,
      token: generateToken(findUser?._id) 
      
    });
   }else{
    throw new Error("invalid username or password");
   }
    }catch(error){
  throw new Error(error);
    }
  });



  
  
  export  {
    createUser,
    loginUser
  };
  
