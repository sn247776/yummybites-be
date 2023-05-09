import express from "express";
import { AddCategory, AddItem, ItemsList } from "../controllers/foodControllers.js";

const router = express.Router();

router.post('/category', AddCategory)
router.post('/items', AddItem)
router.get('/items/list',ItemsList)



  export default router;