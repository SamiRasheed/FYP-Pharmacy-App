import express from "express";
import {
  registerController,
  loginController,
  testController,
  forgotPasswordController,
  updateProfileController,
  getOrdersController,
  getAllOrdersController,
  orderStatusController,
} from "../controllers/authController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";

//router object
const router = express.Router();

//routing
//1st - REGISTER || METHOD POST
router.post("/register", registerController);

//2nd - LOGIN || POST
router.post("/login", loginController);

//5- Forgot Password || POST
router.post("/forgot-password", forgotPasswordController);

//3rd - test routes
router.get("/test", requireSignIn, isAdmin, testController);

//4rth - protected User route auth
router.get("/user-auth", requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});

//6- protected Admin route auth
router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});

//7- update profile
router.put("/profile", requireSignIn, updateProfileController);

//8- orders  ---Client Side
router.get("/orders", requireSignIn, getOrdersController);

//9- all orders  ----Admin Side
router.get("/all-orders", requireSignIn, isAdmin, getAllOrdersController);

//10 -order status update
router.put(
  "/order-status/:orderId",
  requireSignIn,
  isAdmin,
  orderStatusController
);

export default router;
