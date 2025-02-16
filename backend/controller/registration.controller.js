import { User } from "../model/user.model.js";
import bcrypt from "bcryptjs";


export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    console.log(name, email, password);
    
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Something is missing",
        success: false,
      });
    }

    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        message: "User already exist with same this email",
        success: false,
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    return res.status(201).json({
      message: "Account created successfully",
      success: true,
    });
  } catch (error) {
    console.error("Error during registration:", error);
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};






