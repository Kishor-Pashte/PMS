import express from "express";
import vehicleController from "../controllers/vehicleController.js";
import auth from "../middlewares/authMiddleware.js";
import isAdmin from "../middlewares/isAdmin.js";
import isUser from "../middlewares/isUser.js";

const router = express.Router();

//ADMIN ROUTES
router.get(
  "/scan/dashboard",
  auth,
  isAdmin,
  vehicleController.getAdminDashboard,
);
router.post("/generate-qr", auth, isAdmin, vehicleController.generateQR); //admin creates residents vehicle and generate QR + User (vehicle owner)
router.get("/generate-qr", auth, isAdmin, vehicleController.generatedQRList); //get all vehicles / get vehicle by vehicle number
router.post("/scan", auth, isAdmin, vehicleController.scanVehicles); //scan QR while enter/exit and store record logs (like vehicle id, time, date)
// total registered vehicles + total entries/exits today + total inside vehicles
router.get("/scan", auth, isAdmin, vehicleController.getScanHistory);

//USER ROUTES
router.get("/scan/my-vehicles", auth, isUser, vehicleController.getMyVehicles); //get user vehicle

export default router;
