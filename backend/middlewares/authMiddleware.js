import jwt from "jsonwebtoken";
import User from "../models/User.js";
import Admin from "../models/Admin.js";

const auth = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "No token" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    let user;

    if (decoded.role === "admin") {
      user = await Admin.findById(decoded.id).select("-password");
    } else {
      user = await User.findById(decoded.id).select("-password");
    }

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    req.user = user;
    next();
  } catch (e) {
    console.error(e);
    return res.status(401).json({ message: "Unauthorized" });
  }
};

export default auth;
