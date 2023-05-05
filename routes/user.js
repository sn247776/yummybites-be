import express from "express";
import { User } from "../models/user.js";
import { body, validationResult } from "express-validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post(
  "/register",
  body("email").isEmail(),
  body("name").isLength({ min: 3 }),
  body("location").isLength({ min: 5 }),
  body("password", "Password Length Must be 8 Characters").isLength({ min: 8 }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const { name, email, location, password } = req.body;
      let userData = await User.findOne({ email });
      if (userData) {
        return res.status(400).json({ errors: "userfound" });
      }
      const hashedPassword = await bcrypt.hash(password, 10);

      userData = await User.create({
        name,
        email,
        location,
        password: hashedPassword,
      });
      res.json({ success: true });
    } catch (error) {
      res.json({ success: false });
    }
  }
);

router.post(
  "/login",
  [
    body("email", "Enter a Valid Email").isEmail(),
    body("password", "Password cannot be blank").exists(),
  ],
  async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() }); 
    }
    const { email, password } = req.body;
    try {
      let userData = await User.findOne({ email });
      if (!userData) {
        return res.json({ success: false, error: "Enter a valid Email" });
      }
      const isMatch = await bcrypt.compare(password, userData.password);

      if (!isMatch) {
        return res.json({ success: false, error: "password not match" });
      }

      const data = {
        user:{
          id:userData.id
        }
      }
      const authToken = jwt.sign(data,process.env.JWT_SECRET)
      res.json({ success: true,authToken:authToken });
    } catch (error) {
      console.error(error.message);
      res.send("Server Error");
    }
  }
);

export default router;
