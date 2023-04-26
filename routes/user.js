import express from "express";
import { User } from "../models/user.js";

import { body, validationResult } from "express-validator";

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
      const { name, email, password, location } = req.body;
      await User.create({ name, email, password, location });
      res.json({ success: true });
    } catch (error) {
      console.log(error);
      res.json({ success: false });
    }
  }
);

router.post('/login', [
    body('email', "Enter a Valid Email").isEmail(),
    body('password', "Password cannot be blank").exists(),
], async (req, res) => {
    let success = false
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });  //{email:email} === {email}
        if (!user) {
            return res.status(400).json({ success, error: "Try Logging in with correct credentials" });
        }

        if (req.body.password !== user.password) {
            return res.status(400).json({ success, error: "password not match" });
        }

        res.json({ success: true })


    } catch (error) {
        console.error(error.message)
        res.send("Server Error")
    }
})

export default router;
