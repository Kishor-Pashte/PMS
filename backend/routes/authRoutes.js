import express from "express";
import authController from "../controllers/authController.js";

const router = express.Router();

//admin login
router.post("/admin/login", authController.adminLogin);

//user login
router.post("/user/login", authController.userLogin);

//admin register
router.post("/admin/register", authController.adminRegister);

export default router;
