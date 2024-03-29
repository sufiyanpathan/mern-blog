import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";
import { globalErrHandler } from "./middlewares/globalErrHandler.js";
import { pageNotFound } from "./middlewares/pageNotFound.js";
import cookieParser from "cookie-parser";
import postRouter from "./routes/post.route.js";

dotenv.config();

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("MongoDb is connected");
  })
  .catch((error) => {
    console.log(error);
  });

const app = express();
app.use(express.json());

app.use(cookieParser());

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}!`);
});

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/post", postRouter);

//-------------Error handle middleware------------//
app.use(globalErrHandler);
//------------404 Error---------------------------//
app.use("*", pageNotFound);
