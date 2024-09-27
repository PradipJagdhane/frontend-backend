const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const jwt = require("jsonwebtoken");
const Joi = require('joi');
const router = express.Router();
const SECRET_KEY = "your_jwt_secret_key"; 


const signUpSchema = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  confirmPassword: Joi.any().valid(Joi.ref('password')).required().messages({
    "any.only": "Passwords do not match",
  }),
  role: Joi.string().valid('admin', 'patient').required()
});

// Register (Sign Up)
router.post('/signup', async (req, res) => {
  const { name, email, password, confirmPassword, role } = req.body;

  const { error } = signUpSchema.validate(req.body);

  if(error) {
    return res.status(400).json({ msg: error.details[0].message });
  }

  // Simple validation
  // if (!name || !email || !password || !confirmPassword || !role) {
  //   return res.status(400).json({ msg: 'Please enter all fields' });
  // }

  if (password !== confirmPassword) {
    return res.status(400).json({ msg: 'Passwords do not match' });
  }

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role,
    });

    

    // Save the user to the database
    await newUser.save();

    res.status(201).json({ msg: 'User registered successfully!' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});



router.post("/login", async (req, res) => {
    const { email, password } = req.body;
  
    // Validate input
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required." });
    }
  
    try {
      // Check if user exists in the database
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: "Invalid email" });
      }
  
      // Validate password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Invalid password." });
      }
  
      // Create a JWT token
      const token = jwt.sign({ email: user.email, name: user.name, role: user.role }, SECRET_KEY, { expiresIn: "1h" });
  
      // Send response with the token
      res.json({ message: "Login successful!", token });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  });



  router.get("/usersdata", async(req, res) => {
    try {
      const users = await User.find({}, 'name email role');
      res.json(users);
    }catch (err) {
      console.log(err);
      res.status(500).json({message: "Server error"});
    }
  });
  



  router.get("/api/protected", (req, res) => {
    const token = req.headers.authorization;
  
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }
  
    try {
      const decoded = jwt.verify(token, SECRET_KEY);
      res.json({ message: "This is a protected route", user: decoded });
    } catch (err) {
      res.status(401).json({ message: "Invalid token" });
    }
  });

module.exports = router;
