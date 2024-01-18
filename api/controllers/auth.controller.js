import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

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

const signIn = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password || email === "" || password === "") {
    return next(errorHandler(400, "All fields are required"));
  }
  try {
    const validUser = await User.findOne({ email });
    if (!validUser) {
      return next(errorHandler(404, "User Not Found"));
    }

    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) {
      return next(errorHandler(400, "Invalid Password"));
    }

    const token = jwt.sign(
      {
        id: validUser._id,
      },
      process.env.JWT_SECRET_KEY
    );

    const { password: pass, ...userWithoutPassword } = validUser._doc;

    res
      .status(200)
      .cookie("access-token", token, {
        httpOnly: true,
      })
      .json(userWithoutPassword);
  } catch (error) {
    next(error);
  }
};

const signInWithGoogle = async (req, res, next) => {
  const { name, email, googlePhotoUrl } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      const token = jwt.sign(
        {
          id: user._id,
        },
        process.env.JWT_SECRET_KEY
      );

      const { password, ...userWithoutPassword } = user._doc;

      res
        .status(200)
        .cookie("access-token", token, {
          httpOnly: true,
        })
        .json(userWithoutPassword);
    } else {
      const generatePassword = Math.random().toString(36).slice(-8);
      const hashedPassword = bcryptjs.hashSync(generatePassword, 10);

      const newUser = new User({
        username:
          name.toLowerCase().split(" ").join("") +
          Math.random().toString(9).slice(-4),
        email,
        password: hashedPassword,
        profilePicture: googlePhotoUrl,
      });

      await newUser.save();

      const token = jwt.sign(
        {
          id: newUser._id,
        },
        process.env.JWT_SECRET_KEY
      );

      const { password, ...userWithoutPassword } = newUser._doc;

      res
        .status(200)
        .cookie("access-token", token, {
          httpOnly: true,
        })
        .json(userWithoutPassword);
    }
  } catch (error) {
    next(error);
  }
};
export { signUp, signIn, signInWithGoogle };
