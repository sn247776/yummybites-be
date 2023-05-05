import express from "express";
import { config } from "dotenv";
import userRouter from "./routes/user.js";
import foodRouter from "./routes/food.js"
import orderData from "./routes/orderData.js"
import bodyParser from "body-parser";
import cors from "cors"
import mongoose from "mongoose";

export const app = express();
app.use(bodyParser.json());

// congig.env file must be define 1st on the top to use the env variable. otherwiste face env varable not work.
config({
    path: "./data/config.env",
  });

app.use(
  cors({
    origin: [process.env.FE_URL, "http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
  
);

// to use CORS everywhare use only app.use(cors()); and its done.

// app.use(cors({
//   origin: '*',
//   methods: ["GET", "POST", "PUT", "DELETE"],
//   credentials: true,
// }));



//Using Routes
app.use("/api/v1/users", userRouter);
app.use("/api/v1", orderData);
app.use("/api/v1", foodRouter);

app.get('/', (req, res) => {
  res.send('Hello World!')
})

