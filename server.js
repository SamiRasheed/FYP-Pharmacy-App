import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoute from "./routes/authRoute.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import blogRoutes from "./routes/blogRoutes.js";
import cors from "cors";

//configure env file
dotenv.config();

//databse config
connectDB();

//rest obj
const app = express();

//middelwares
// fontend ----server ko connect krtay wqt error na aye
app.use(cors());
// ---------------
app.use(express.json());
app.use(morgan("dev"));

//routes
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/product", productRoutes);
app.use("/api/v1/blog", blogRoutes);
// app.use("/api/v1/blog", blogRoutes);

//rest api
app.get("/", (req, res) => {
  res.send("<h1>Welcome to Online Pharmacy App</h1>");
});

// Port

const PORT = process.env.PORT || 8080;

//app listen
app.listen(PORT, () => {
  console.log(
    `Server running on ${process.env.DEV_MODE} mode on port ${PORT}`.bgCyan
      .white
  );
});
