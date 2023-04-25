import express from "express";
import { config } from "dotenv";
import userRouter from "./routes/user.js";
import bodyParser from "body-parser";

export const app = express();
app.use(bodyParser.json());

config({
    path: "./data/config.env",
  });

//Using Routes
app.use("/api/v1/users", userRouter);

app.get('/', (req, res) => {
  res.send('Hello World!')
})