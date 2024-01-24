import express from "express";
import {
  deleteUser,
  getUsers,
  signOut,
  updateUser,
} from "../controllers/user.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const userRouter = express.Router();

userRouter.put("/update/:userId", verifyToken, updateUser);
userRouter.delete("/delete/:userId", verifyToken, deleteUser);
userRouter.post("/sign-out", signOut);
userRouter.get("/getusers", verifyToken, getUsers);
export default userRouter;
