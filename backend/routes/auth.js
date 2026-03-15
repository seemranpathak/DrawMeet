
import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from  "../models/User.js"

const router = express.Router();

//Register 
router.post("/register", async(req, res)=>{
    try {
        const {username, email, password}= req.body;
        const userExists = await User.findOne({email});

        if(userExists){
            return res.status(400).json({message:"User already exists"});
        }
        const handlePassword = await bcrypt.hash(password, 6);

        const newUser = new User({
            username,
            email, 
            password: handlePassword
        });

        await newUser.save();
        res.status(201).json({message:"User registered successfully"});


    } catch (error) {
        res.status(500).json({message:"Internal server error"});
        console.log(error)
    }
});

//Login

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Please provide both email and password" });
    }

    // Find user
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    // Generate token
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;