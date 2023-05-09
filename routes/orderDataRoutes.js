import express from "express";
import { OrderData, OrderList } from "../controllers/orderDataControllers.js";

const router = express.Router();

router.post('/orderdata', OrderData)
router.post('/mydata', OrderList);


  export default router;