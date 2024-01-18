import express from "express";
import {
  signIn,
  signInWithGoogle,
  signUp,
} from "../controllers/auth.controller.js";

const authRouter = express.Router();

authRouter.post("/sign-up", signUp);
authRouter.post("/sign-in", signIn);
authRouter.post("/google", signInWithGoogle);

export default authRouter;
