import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
    CategoryName:String,
    name:String,
    img:String,
    description:String,
    options:[{
        half:String,
        full:String,
        regular:String,
        medium:String,
        large:String,
    }],
    
  })
  
  export const Item = mongoose.model('Item',itemSchema);