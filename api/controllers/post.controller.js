import Post from "../models/post.model.js";
import { errorHandler } from "../utils/error.js";

export const create = async (req, res, next) => {
  if (!req.user.isAdmin) {
    return next(errorHandler(403, "You are not allowed to create a post"));
  }
  if (!req.body.title || !req.body.content) {
    return next(errorHandler(400, "Please provide all required fields"));
  }

  const lowercased = req.body.title.toLowerCase();

  // Remove special characters, replace spaces with a single hyphen
  const cleanedSlug = lowercased.replace(/[^\w\s]/g, "").replace(/\s+/g, "-");

  const newPost = new Post({
    ...req.body,
    slug: cleanedSlug,
    userId: req.user.id,
  });
  try {
    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (error) {
    next(error);
  }
};
