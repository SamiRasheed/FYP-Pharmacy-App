import express from "express";
import { isAdmin, requireSignIn } from "./../middlewares/authMiddleware.js";
import {
  getAllBlogsController,
  createBlogController,
  updateBlogController,
  getBlogByIdController,
  deleteBlogController,
  blogPhotoController,
  // userBlogControlller,
} from "../controllers/blogControlller.js";
import formidable from "express-formidable";

//router object
const router = express.Router();

//routes
//POST || create blog
router.post(
  "/create-blog",
  requireSignIn,
  isAdmin,
  formidable(),
  createBlogController
);

// GET || all blogs
router.get("/all-blog", getAllBlogsController);

//PUT || update blog
router.put(
  "/update-blog/:id",
  requireSignIn,
  isAdmin,
  formidable(),
  updateBlogController
);

//GET || Single Blog
router.get("/get-blog/:slug", getBlogByIdController);

//get photo
router.get("/blog-photo/:pid", blogPhotoController);

//DELETE || delete blog
router.delete("/delete-blog/:id", deleteBlogController);

//GET || user blog
// router.get("/user-blog/:id", userBlogControlller);

export default router;
