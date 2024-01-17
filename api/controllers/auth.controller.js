import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";

const signUp = async (req, res, next) => {
  const { username, email, password } = req.body;

  try {
    //check if email exists
    const userFound = await User.findOne({ email });
    if (userFound) {
      return next(errorHandler(400, "User already exists"));
    }

    const hashedPassword = bcryptjs.hashSync(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(200).json({
      message: "Signup successfull",
      data: newUser,
    });
  } catch (error) {
    next(error);
  }
};
export { signUp };
