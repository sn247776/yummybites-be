import express from "express";
import { config } from "dotenv";
import userRouter from "./routes/user.js";
import bodyParser from "body-parser";
import cors from "cors"

export const app = express();
app.use(bodyParser.json());

// congig.env file must be define 1st on the top to use the env variable. otherwiste face env varable not work.
config({
    path: "./data/config.env",
  });

app.use(
  cors({
    origin: [process.env.FE_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);


//Using Routes
app.use("/api/v1/users", userRouter);

app.get('/', (req, res) => {
  res.send('Hello World!')
})