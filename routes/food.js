import express from "express";
import { Category } from "../models/category.js";
import { Item } from "../models/items.js";

const router = express.Router();

router.post('/category', async (req, res) =>{
    const category = new Category({
      CategoryName:req.body.CategoryName
    });
    try {
      const newCategory = await category.save();
      res.status(201).json(newCategory);
    }
    catch (err) {
      res.status(400).json({ message: err.message})
    }
  })

  router.get('/category/list',async (req, res) =>{
    try {
      const category = await Category.find();
      res.json(category);
    } catch (error) {
      res.status(500).json({message: err.message})
    }
  })




  router.post('/items', async (req, res) =>{
    const item = new Item({
        "CategoryName": req.body.CategoryName,
        "name": req.body.name,
        "img": req.body.img,
        "description": req.body.description,
        "options":req.body.options       
    });
    try {
      const newItem = await item.save();
      res.status(201).json(newItem);
    }
    catch (err) {
      res.status(400).json({ message: err.message})
    }
  })

  router.get('/items/list',async (req, res) =>{
    try {
      const item = await Item.find();
      res.json(item);
    } catch (error) {
      res.status(500).json({message: err.message})
    }
  })



  export default router;