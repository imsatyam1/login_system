import { User } from "../model/user.model.js";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

export const login = async (req, res) => {
    try {
      const { email, password } = req.body;
      console.log(email, password);
      
  
      // Check if id or password is missing
      if (!email && !password) {
        return res.status(400).json({
          message: "Email and password are required",
          success: false,
        });
      }
  
      let user;

      try {
        user = await User.findOne({email})
      } catch (error) {
        return res.status(501).json({message: "Error occured in finding user", success: false})
      }
  
      // If no user is found
      if (!user) {
        return res.status(400).json({
          message: "Incorrect email or password",
          success: false,
        });
      }
  
      // Check if the password matches
      const isPasswordMatch = await bcrypt.compare(password, user.password);
      if (!isPasswordMatch) {
        return res.status(400).json({
          message: "Incorrect email or password",
          success: false,
        });
      }
  
      // Create JWT token
      const tokenData = {
        userId: user._id,
      };
      
      const token = jwt.sign(tokenData, process.env.SECRET_KEY, {
        expiresIn: "1d",
      });
  
      user = {
        _id: user._id,
        name: user.name,
        email: user.email,
      };

      console.log(token);
      
      res.cookie("token", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000, // 1 day
        httpOnly: true,
        secure: true,
        sameSite: 'None' 
      });
      return res.json({
        message: `Welcome back ${user.name}`,
        user,
        success: true,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        message: "Server error, please try again later",
        success: false,
      });
    }
  };