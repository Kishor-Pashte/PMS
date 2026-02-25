import Admin from "../models/Admin.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

//Admin Login /api/admin/login    (admin registeration done manually)
const adminLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Email & Password required" });
    }

    //find admin by email
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(404).json({ message: "Email does not exists" });
    }

    //compare pass
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentails" });
    }

    //generate jwt token
    const token = jwt.sign(
      { id: admin._id, role: "admin" },
      process.env.JWT_SECRET,
      { expiresIn: "7d" },
    );

    return res
      .status(201)
      .json({ message: "Admin logged in successfully", token });
  } catch (e) {
    next(e);
  }
};

//user login   /api/user/login  (user created automatically when admin registers users)
const userLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Email & Password is required" });
    }

    //find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Email does not exists" });
    }

    //compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    //generate token
    const token = jwt.sign(
      { id: user._id, role: "user" },
      process.env.JWT_SECRET,
      { expiresIn: "7d" },
    );

    res.status(200).json({ message: "User logged in successfully", token });
  } catch (e) {
    next(e);
  }
};

const adminRegister = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const hashPass = await bcrypt.hash(password, 10);

    const admin = await Admin.create({ email, password: hashPass });

    res.status(201).json({ message: "Admin registered successfully!", admin });
  } catch (e) {
    next(e);
  }
};

export default { adminLogin, userLogin, adminRegister };
