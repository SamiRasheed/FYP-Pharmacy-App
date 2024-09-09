import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
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
    // repassword: {
    //   type: String,
    //   required: true,
    // },
    answer: {
      type: String,
      required: true,
    },
    role: {
      type: Number,
      default: 0,
    },
    // blogs: [
    //   {
    //     type: mongoose.Types.ObjectId,
    //     ref: "Blog",
    //   },
    // ],
  },
  { timestamps: true }
);

export default mongoose.model("users", userSchema);
