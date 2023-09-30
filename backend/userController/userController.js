import userModel from "../Model/userSchema.js";
import bcrypt from "bcryptjs";
import { createToken } from "../jwtToken/jwtToken.js";
// Register user controller

export const registerController = async (req, res) => {
  try {
    // Getting user Details

    const { name, email, password, confirmPassword, role } = req.body;

    // confirming password
    if (password != confirmPassword) {
      return res
        .status(401)
        .json({ success: false, message: "Password Does Not match" });
    }

    // Password Hashing
    const hashedPassword = await bcrypt.hash(password, 10);

    // Checking if already a user
    const isUser = await userModel.findOne({ email });

    // TODO: Confirm the status codes
    if (isUser) {
      return res
        .status(200)
        .json({ success: false, message: "User Already Registered" });
    }

    //  TODO: Create  the createToken function

    const user = await userModel.insertMany({
      name,
      email,
      password: hashedPassword,
      role,
    });

    if (user) {
      createToken(user, res, 201);
    }
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error!" });
    console.log(error.message);
  }
};

export const loginController = async (req, res) => {
  try {
    // Getting user Details
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(403)
        .json({ success: false, message: "Please enter username & password" });
    }

    // Check if the user exists
    const user = await userModel.findOne({ email });

    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User not found!" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(403)
        .json({ success: false, message: "User unAuthorized" });
    }

    // TODO: Call the createToken function
    //    return res.status(200).json({success:true,user,message:"User Registered Successfully"})
    createToken(user, res, 201);
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error!" });
    console.log(error.message);
  }
};

export const logoutController = async (req, res) => {
  try {
    await res.cookie('token', '', { expires: new Date(Date.now()) });

    res.status(200).json({ success: true, message: "Logged out successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
