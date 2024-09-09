import slugify from "slugify";
import blogModel from "../models/blogModel.js";
import mongoose from "mongoose";
import fs from "fs";

//GET ALL BLOGS
export const getAllBlogsController = async (req, res) => {
  try {
    const blogs = await blogModel
      .find({})
      .select("-photo")
      .limit(10)
      .sort({ createdAt: -1 });
    return res.status(200).send({
      success: true,
      BlogCount: blogs.length,
      message: "All Blogs lists",
      blogs,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error WHile Getting Blogs",
      error,
    });
  }
};

//Create Blog
export const createBlogController = async (req, res) => {
  try {
    const { title, description } = req.fields;
    const { photo } = req.files;
    //validation
    switch (true) {
      case !title:
        return res.status(500).send({ error: "Title is Required" });
      case !description:
        return res.status(500).send({ error: "Description is Required" });
      case photo && photo.size > 1000000: // 1MB
        return res
          .status(500)
          .send({ error: "photo is Required and should be less then 1MB" });
    }
    // if (!title || !description || !photo) {
    //   return res.status(400).send({
    //     success: false,
    //     message: "Please Provide ALl Fields",
    //   });
    // }
    // const exisitingBlog = await blogModel.findOne({ title });
    // // validaton
    // if (!exisitingBlog) {
    //   return res.status(200).send({
    //     success: false,
    //     message: "Blog Already Exists",
    //   });
    // }
    const blogs = new blogModel({ ...req.fields, slug: slugify(title) });
    if (photo) {
      blogs.photo.data = fs.readFileSync(photo.path);
      blogs.photo.contentType = photo.type;
    }
    await blogs.save();
    res.status(201).send({
      success: true,
      message: "Product Created Successfully",
      blogs,
    });

    const newBlog = new blogModel({
      title,
      slug: slugify(title),
      description,
      photo,
    });
    // const session = await mongoose.startSession();
    // session.startTransaction();
    // await newBlog.save({ session });
    // exisitingBlog.blogs.push(newBlog);
    // await exisitingBlog.save({ session });
    // await session.commitTransaction();

    // await newBlog.save();
    // return res.status(201).send({
    //   success: true,
    //   message: "Blog Created!",
    //   newBlog,
    // });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success: false,
      message: "Error WHile Creting blog",
      error,
    });
  }
};

//Update Blog
export const updateBlogController = async (req, res) => {
  try {
    const { title, description } = req.fields;
    const { photo } = req.files;
    //validation
    switch (true) {
      case !title:
        return res.status(500).send({ error: "Title is Required" });
      case !description:
        return res.status(500).send({ error: "Description is Required" });
      case photo && photo.size > 1000000: // 1MB
        return res
          .status(500)
          .send({ error: "photo is Required and should be less then 1MB" });
    }
    const blog = await blogModel.findByIdAndUpdate(
      req.params.id,
      { ...req.fields, slug: slugify(title) },
      { new: true }
    );
    if (photo) {
      blog.photo.data = fs.readFileSync(photo.path);
      blog.photo.contentType = photo.type;
    }
    await blog.save();
    res.status(201).send({
      success: true,
      message: "Blog Updated Successfully",
      blog,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in Update product",
    });
  }
};

//SIngle Blog
export const getBlogByIdController = async (req, res) => {
  try {
    const blog = await blogModel
      .findOne({ slug: req.params.slug })
      .select("-photo");
    if (!blog) {
      return res.status(404).send({
        success: false,
        message: "Blog not found with this Name",
      });
    }
    return res.status(200).send({
      success: true,
      message: "fetch single blog",
      blog,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success: false,
      message: "Eror while getting single blog",
      error,
    });
  }
};

// get photo
export const blogPhotoController = async (req, res) => {
  try {
    const blog = await blogModel.findById(req.params.pid).select("photo");
    if (blog.photo.data) {
      res.set("Content-type", blog.photo.contentType);
      return res.status(200).send(blog.photo.data);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Erorr while getting photo",
      error,
    });
  }
};

//Delete Blog
export const deleteBlogController = async (req, res) => {
  try {
    const blog = await blogModel
      // .findOneAndDelete(req.params.id)
      .findByIdAndDelete(req.params.id)
      .select("-photo");
    //   .populate("user");
    // await blog.user.blogs.pull(blog);
    // await blog.user.save();
    return res.status(200).send({
      success: true,
      message: "Blog Deleted Successfully!",
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success: false,
      message: "Erorr WHile Deleteing BLog",
      error,
    });
  }
};

//GET USER BLOG
// export const userBlogControlller = async (req, res) => {
//   try {
//     const userBlog = await userModel.findById(req.params.id).populate("blogs");

//     if (!userBlog) {
//       return res.status(404).send({
//         success: false,
//         message: "blogs not found with this id",
//       });
//     }
//     return res.status(200).send({
//       success: true,
//       message: "user blogs",
//       userBlog,
//     });
//   } catch (error) {
//     console.log(error);
//     return res.status(400).send({
//       success: false,
//       message: "error in user blog",
//       error,
//     });
//   }
// };
