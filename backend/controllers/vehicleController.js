import Admin from "../models/Admin.js";
import Vehicle from "../models/Vehicle.js";
import { v4 as uuidv4 } from "uuid";
import QRCode from "qrcode";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import Scan from "../models/Scan.js";

//Generate QR Code API
const generateQR = async (req, res, next) => {
  try {
    const {
      ownerName,
      vehicleNumber,
      email,
      flatNumber,
      vehicleType,
      contact,
    } = req.body;

    if (
      !ownerName ||
      !vehicleNumber ||
      !email ||
      !flatNumber ||
      !vehicleType ||
      !contact
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingVehicle = await Vehicle.findOne({ vehicleNumber });
    if (existingVehicle) {
      return res.status(400).json({ message: "Vehicle already registered" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already registered" });
    }

    const hashPassword = await bcrypt.hash(contact, 10);

    // ✅ Create User FIRST
    const user = await User.create({
      name: ownerName,
      email,
      password: hashPassword,
    });

    // ✅ Generate QR
    const qrId = uuidv4();
    const qrImage = await QRCode.toDataURL(qrId);

    // ✅ Create Vehicle linked to THAT user
    const vehicle = await Vehicle.create({
      ownerName,
      vehicleNumber,
      email,
      flatNumber,
      vehicleType,
      contact,
      qrId,
      qrImage,
      user: user._id, // VERY IMPORTANT
    });

    res.status(201).json({
      message: "Vehicle registered successfully & QR Code generated",
      vehicle,
      qrImage,
    });
  } catch (e) {
    next(e);
  }
};

//Vehicle List API
const generatedQRList = async (req, res, next) => {
  try {
    const { search } = req.query;

    const query = {};
    if (search) {
      query.vehicleNumber = {
        $regex: search,
        $options: "i",
      };
    }

    const vehicles = await Vehicle.find(query).sort({ createdAt: -1 });
    res.status(200).json({ vehicles, message: "Vehicles fetch successfully" });
  } catch (e) {
    next(e);
  }
};

//Scanner Page
const scanVehicles = async (req, res, next) => {
  try {
    const { qrId } = req.body;

    const vehicle = await Vehicle.findOne({ qrId });
    if (!vehicle) {
      return res.status(404).json({ message: "Invalid QR" });
    }

    //get last(latest) scan record
    const lastScan = await Scan.findOne({ qrId }).sort({ time: -1 });

    console.log("Last scan type => ", lastScan);
    //  We are now going to decide scanType (Entry / Exit)
    let newScanType;

    if (!lastScan) {
      //first time -> scanType = 'Entry'
      newScanType = "Entry";
    } else if (lastScan.scanType === "Entry") {
      newScanType = "Exit";
    } else {
      newScanType = "Entry";
    }

    console.log("New scan type", newScanType);

    //create new scan records

    const newScan = await Scan.create({
      vehicleId: vehicle._id,
      qrId: qrId,
      scanType: newScanType,
      time: new Date(),
      date: new Date(),
    });

    console.log("newScan scanType =>", newScan.scanType);

    res.status(201).json({
      message: `${vehicle.vehicleNumber} ${newScanType} recorded`,
      scan: newScan,
    });
  } catch (e) {
    next(e);
  }
};

const getMyVehicles = async (req, res, next) => {
  try {
    console.log(req.user);
    const vehicles = await Vehicle.findOne({ user: req.user._id });
    res.status(200).json(vehicles);
  } catch (e) {
    next(e);
  }
};

//dashboard
const getAdminDashboard = async (req, res, next) => {
  try {
    const totalVehicles = await Vehicle.countDocuments();

    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0); //12.00 AM

    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999); // 11:59 PM
    const totalEntriesToday = await Scan.countDocuments({
      //total entries today
      scanType: "Entry",
      time: {
        $gte: startOfDay,
        $lte: endOfDay,
      },
    });

    //const total Exists Today
    const totalExitsToday = await Scan.countDocuments({
      scanType: "Exit",
      time: {
        $gte: startOfDay,
        $lte: endOfDay,
      },
    });

    //currently inside vehicles  => get all vehicles id's => loop through them => find lastScan => and if lastScan scanType === Entry => count ++
    const vehicles = await Vehicle.find().select("_id");
    let insideCount = 0;
    for (const vehicle of vehicles) {
      const lastScan = await Scan.findOne({ vehicleId: vehicle._id }).sort({
        time: -1,
      });

      if (lastScan && lastScan.scanType === "Entry") {
        insideCount++;
      }
    }

    res.status(200).json({
      totalVehicles,
      totalEntriesToday,
      totalExitsToday,
      insideVehicles: insideCount,
    });
  } catch (e) {
    next(e);
  }
};

const getScanHistory = async (req, res, next) => {
  try {
    const { date, scanType, vehicleNumber } = req.query;

    //View all scans => if there is no query we got all scans

    let query = {};

    //filter by date  (?date=2026-02-24) => first convert it into full day range
    if (date) {
      const start = new Date(date);
      start.setHours(0, 0, 0, 0); // 24 feb 00:00 am

      const end = new Date(date);
      end.setHours(23, 59, 59, 999); //24 feb 11:59 pm

      query.date = {
        $gte: start,
        $lte: end,
      };
    }

    //filter by scanType
    if (scanType) {
      query.scanType = scanType;
    }

    //find by vehicle number => 1. find vehicle by vehicle number, 1. find scan history of vehicle by vehicleId
    if (vehicleNumber) {
      const vehicle = await Vehicle.findOne({
        vehicleNumber: { $regex: vehicleNumber, $options: "i" },
      }); //case sensitive + partial input search

      if (vehicle) {
        query.vehicleId = vehicle._id; //pass vehicle id in query
      }
    }

    const scans = await Scan.find(query)
      .populate("vehicleId")
      .sort({ time: -1 });

    res
      .status(200)
      .json({ message: "History fetch successfully", scanHistory: scans });
  } catch (e) {
    next(e);
  }
};

const getUserParkingHistory = async (req, res, next) => {
  try {
    //1. find vehicles of user => then store their id's, 2. find scan history of users vehicle (by vehicleId)

    const userVehicles = await Vehicle.find({ user: req.user._id });
    const vehicleIds = userVehicles.map((v) => v._id);

    //filter by date
    let scanQuery = { vehicleId: { $in: vehicleIds } }; //if vehicle id inside vehicleId's then return full document
    if (req.query.date) {
      const start = new Date(req.query.date);
      start.setHours(0, 0, 0, 0);

      const end = new Date(req.query.date);
      end.setHours(23, 59, 59, 999);

      scanQuery.date = { $gte: start, $lte: end };
    }

    const scans = await Scan.find(scanQuery).sort({ time: 1 }); //time: 1 because we want chronological order

    //convert scans to parking sessions
  } catch (e) {
    next(e);
  }
};

export default {
  getAdminDashboard,
  generateQR,
  generatedQRList,
  scanVehicles,
  getScanHistory,
  getMyVehicles,
};
