import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    CategoryName:String,
  })
  
  export const Category = mongoose.model('Category',categorySchema);