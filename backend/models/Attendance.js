const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema(
  {
    memberName: {
      type: String,
      required: true,
    },

    plan: {
      type: String,
      default: "Basic",
    },

    type: {
      type: String,
      enum: ["QR", "Manual"],
      default: "Manual",
    },

    checkIn: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Attendance", attendanceSchema);