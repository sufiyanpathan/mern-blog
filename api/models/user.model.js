import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    profilePicture: {
      type: String,
      default:
        "https://w7.pngwing.com/pngs/306/70/png-transparent-computer-icons-management-admin-silhouette-black-and-white-neck-thumbnail.png",
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

export default User;
