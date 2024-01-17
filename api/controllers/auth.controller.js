import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";

const signUp = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    //check if email exists
    const userFound = await User.findOne({ email });
    if (userFound) {
      return res.status(400).json({ message: "User already exists" });
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
    res.status(500).json({ message: error.message });
  }
};
export { signUp };
