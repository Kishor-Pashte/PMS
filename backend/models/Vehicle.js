import mongoose from "mongoose";

const vehicleSchema = new mongoose.Schema({
  ownerName: {
    type: String,
    required: true,
  },
  vehicleNumber: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  flatNumber: {
    type: String,
    required: true,
  },
  vehicleType: {
    type: String,
    required: true,
  },
  contact: {
    type: Number,
    required: true,
  },
  qrId: {
    type: String,
  },
  qrImage: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

export default mongoose.model("Vehicle", vehicleSchema);
