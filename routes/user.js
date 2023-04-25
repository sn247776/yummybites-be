import express from "express";
import { User } from "../models/user.js";

import { body, validationResult } from "express-validator";

const router = express.Router();


router.post("/register", 
body('email').isEmail(),
body('name').isLength({min: 3}),
body('location').isLength({min: 5}),
body('password','Password Length Must be 8 Characters').isLength({min: 8}),
async (req, res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array() })
    }
   try {
    const { name, email, password, location } = req.body;
    await User.create({  name, email, password, location });
    res.json({success:true});
   } catch (error) {
    console.log(error)
    res.json({success:false});
   }
})

export default router;