import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import vehicleRoutes from "./routes/vehicleRoutes.js";
import errMiddleware from "./middlewares/errorMiddleware.js";

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  console.log("Route working");
});
//routes
app.use("/api", authRoutes);
app.use("/api", vehicleRoutes);

//connect to database
connectDB();

//error handling middleware
app.use(errMiddleware);

app.listen(process.env.PORT, () => {
  console.log(`Server is listening on port ${process.env.PORT}`);
});
