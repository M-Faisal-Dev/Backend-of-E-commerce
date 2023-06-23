import User from "../models/userModel.js";
import asyncHandler from "express-async-handler";
import generateToken from "../config/jwToken.js";
import validateMongoId from "../ulits/validateMongodbId.js";
import generateRefreshToken from "../config/refreshToken.js";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import sendEmail from "./emailCtrl.js";

const createUser = asyncHandler(async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      const createdUser = await User.create(req.body);
      res.json(createdUser);
    } else {
      throw new Error("user already exists");
    }
  } catch (err) {
    throw new Error(err);
  }
});

// login user

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  try {
    const findUser = await User.findOne({ email });
    console.log(findUser.firstname + " " + findUser.lastname);
    if (findUser && (await findUser.isPasswordMatch(password))) {
      const refreshToken = generateRefreshToken(findUser?.id);
      const updatedUser = await User.findByIdAndUpdate(
        findUser.id,
        {
          refreshToken: refreshToken,
        },
        { new: true }
      );
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        maxAge: 72 * 60 * 60 * 1000,
      });
      res.json({
        _id: findUser.id,
        firstname: findUser.firstname,
        lastname: findUser.lastname,
        email: findUser.email,
        mobile: findUser.mobile,
        token: generateToken(findUser?._id),
      });
    } else {
      throw new Error("invalid username or password");
    }
  } catch (error) {
    throw new Error(error);
  }
});

// login in Admin 

const loginAdmin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  try {
    const findAdmin = await User.findOne({ email });

    if (!findAdmin || findAdmin.role !== "Admin") {
      throw new Error("Not authorized");
    }

    if (await findAdmin.isPasswordMatch(password)) {
      const refreshToken = generateRefreshToken(findAdmin.id);
      const updatedUser = await User.findByIdAndUpdate(
        findAdmin.id,
        {
          refreshToken: refreshToken,
        },
        { new: true }
      );
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        maxAge: 72 * 60 * 60 * 1000,
      });
      res.json({
        _id: findAdmin.id,
        firstname: findAdmin.firstname,
        lastname: findAdmin.lastname,
        email: findAdmin.email,
        mobile: findAdmin.mobile,
        token: generateToken(findAdmin._id),
      });
    } else {
      throw new Error("Invalid username or password");
    }
  } catch (error) {
   throw new Error(error);
  }
});



// handle refeshToken

const handleRefreshToken = asyncHandler(async (req, res) => {
  const cookie = req.cookies;
  if (!cookie.refreshToken)
    throw new Error("refreshToken is not set in cookie");
  const refreshToken = cookie.refreshToken;
  const user = await User.findOne({ refreshToken });
  if (!user) throw new Error("not refresh token available");
  jwt.verify(refreshToken, process.env.SECRET_KEY, (err, decoded) => {
    if (err || user.id !== decoded.id) {
      throw new Error("there is something wrong with the refresh token");
    }
    const accessToken = generateToken(user?._id);
    res.json({accessToken});
  });
});

// user logout functionality

const handleLogout = asyncHandler(async (req, res) => {
  const cookie = req.cookies;
  if (!cookie.refreshToken)
    throw new Error("refreshToken is not set in cookie");
  const refreshToken = cookie.refreshToken;
  const user = await User.findOne({ refreshToken });
  console.log(user)
  if (!user) {
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: true,
    });
    return res.sendStatus(204);
  }
  const clearCookies = await User.findOneAndUpdate(
    { refreshToken },
    {
      refreshToken: "",
    },
    { new: true }
  );
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: true,
  });
  res.sendStatus(204)
});

// get all user

const getAllUser = asyncHandler(async (req, res) => {
  try {
    const getUser = await User.find();
    res.json(getUser);
  } catch (error) {
    throw new Error(error);
  }
});

// get single user

const getSingleUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoId(id);
  try {
    const getSingUser = await User.findById(id);
    res.json(getSingUser);
  } catch (error) {
    throw new Error(error);
  }
});

// delete user

const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoId(id);
  try {
    const delUser = await User.findByIdAndDelete(id);
    res.json(delUser);
  } catch (error) {
    throw new Error(error);
  }
});

// update user
const updateUser = asyncHandler(async (req, res) => {
  const { id } = req.user;
  validateMongoId(id);
  try {
    const upUser = await User.findByIdAndUpdate(
      id,
      {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        mobile: req.body.mobile,
      },
      { new: true }
    );

    res.json(upUser);
  } catch (error) {
    throw new Error(error);
  }
});

// block user

const blockUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoId(id);
  try {
    const block = await User.findByIdAndUpdate(
      id,
      { isBlocked: true },
      { new: true }
    );
    res.json({
      message: "User Blocked",
    });
  } catch (error) {
    throw new Error(error);
  }
});

// unblockUser

const unblockUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoId(id);
  try {
    const unBlock = await User.findByIdAndUpdate(
      id,
      { isBlocked: false },
      { new: true }
    );
    res.json({
      message: "Unblock User",
    });
  } catch (error) {
    throw new Error(error);
  }
});

// update password 

const updatePassword = asyncHandler(async (req,res)=>{
const { id } = req.user
const { password } = req.body;
validateMongoId(id);
try{
const user = await User.findById(id);
if(password){
  user.password = password;
  const updatePassword = await user.save()
  res.json(updatePassword)
}else{
  res.json(user)
}
}catch(error){
throw new Error(error);
}
})

// forget password token 


const forgetPasswordToken = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  
  if (!user) {
    throw new Error("User not found with this email address");
  }
  
  try {
    const token = await user.createPasswordResetToken();
    await user.save();
    let resetUrl = `http://localhost:5000/api/user/reset-password/${token}`;
    const data = {
      to: email,
      text: "Hello, please follow the link to reset your password: " + resetUrl,
      subject: "Reset your password",
      html: `<a href="${resetUrl}">Click Here</a>`,
    };
    
    sendEmail(data);
    res.json(token);
  } catch (error) {
    throw new Error(error);
  }
});


// reset password

const resetPassword = asyncHandler(async (req, res) => {
  const { password } = req.body;
  const { token } = req.params;
  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
  
  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetTokenExpiresAt: { $gt: Date.now() },
  });
  
  if (!user) {
    throw new Error("Token Expired, please try again later");
  }
  
  user.password = password;
  user.passwordResetToken = undefined;
  user.passwordResetTokenExpiresAt = undefined;
  
  await user.save();
  
  res.json(user);
});



const getWishList = asyncHandler(async(req, res)=>{
  const {id} = req.user;
  try{
const findUser = await User.findById(id).populate("wishlist")
res.json(findUser)
  }catch(error){
throw new Error(error)
  }
})


export {
  createUser,
  loginUser,
  getAllUser,
  getSingleUser,
  deleteUser,
  updateUser,
  blockUser,
  unblockUser,
  handleRefreshToken,
  handleLogout,
  updatePassword,
  forgetPasswordToken,
  resetPassword,
  loginAdmin,
  getWishList
};
