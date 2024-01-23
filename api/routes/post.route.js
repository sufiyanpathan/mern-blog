import express from "express";
import { verifyToken } from "../utils/verifyUser";
import { create } from "../controllers/post.controller";

const postRouter = express.Router();

userRouter.post("/create-post", create);

export default postRouter;
