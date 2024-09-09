import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    photo: {
      data: Buffer,
      contentType: String,
    },
    user: {
      type: mongoose.ObjectId,
      ref: "users",
      require: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Blog", blogSchema);
