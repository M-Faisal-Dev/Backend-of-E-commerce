import User from "../models/userModel.js"
import asyncHandler from "express-async-handler";

const createUser = asyncHandler(async (req, res) => {
    try {
      const { email } = req.body;
      const user = await User.find({ email });
      console.log(user)
  
      if (!user) {
        const createdUser = await User.create(req.body);
        res.json(createdUser);
      } else {
        // Handle case when user already exists
        res.status(409).json({ message: 'User already exists' });
      }
    } catch (error) {
      throw new Error(error);
    }
  });
  
  export default createUser;
  
