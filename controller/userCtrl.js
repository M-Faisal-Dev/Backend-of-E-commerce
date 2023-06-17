import User from "../models/userModel.js"
import asyncHandler from "express-async-handler";
import generateToken from "../config/jwToken.js";
import validateMongoId from "../ulits/validateMongodbId.js";


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

// get all user 

const getAllUser = asyncHandler(async (req,res) => {
  try{
const getUser = await User.find()
res.json(getUser)
  }catch(error){
throw new Error(error)
  }
})

// get single user

  const getSingleUser = asyncHandler(async(req,res)=>{
    const {id} = req.params
    try{
const getSingUser = await User.findById(id)
res.json(getSingUser)
    }catch(error){
      throw new Error(error)
    }
  })

// delete user 

  const deleteUser = asyncHandler(async(req,res)=>{
    const {id} = req.params
    try{
const delUser = await User.findByIdAndDelete(id)
res.json(delUser)
    }catch(error){
      throw new Error(error)
    }
  })

  // update user  
  const updateUser = asyncHandler(async(req,res)=>{
    const {id} = req.user
    try{
const upUser = await User.findByIdAndUpdate(id, 
{
  firstname: req.body.firstname,
  lastname: req.body.lastname,
  email : req.body.email,
  mobile: req.body.mobile
},{new: true})

res.json(upUser)
    }catch(error){
      throw new Error(error)
    }
  })

// block user  

const blockUser = asyncHandler(async(req,res)=>{
  const {id} = req.params
  try{
const block = await User.findByIdAndUpdate(id,{isBlocked: true},{new: true})
res.json({
  message: "User Blocked"
})
  }catch(error){
    throw new Error(error)
  }
})

// unblockUser 

const unblockUser = asyncHandler(async(req,res)=>{
  const {id} = req.params
  try{
    const unBlock = await User.findByIdAndUpdate(id,{isBlocked: false},{new: true})
    res.json({
      message: "Unblock User"
    })

  }catch(error){
    throw new Error(error)
  }
})


  
  export  {
    createUser,
    loginUser,
    getAllUser,
    getSingleUser,
    deleteUser,
    updateUser,
    blockUser,
    unblockUser
  };
  
