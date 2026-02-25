import mongoose from "mongoose";

const scanSchema = new mongoose.Schema(
  {
    vehicleId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vehicle",
      required: true,
    },
    qrId: {
      type: String,
      required: true,
    },
    scanType: {
      type: String,
      enum: ["Entry", "Exit"],
    },
    time: {
      type: Date,
      default: Date.now,
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true },
);

export default mongoose.model("Scan", scanSchema);
