const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
  {
    memberName: {
      type: String,
      required: true,
    },

    amount: {
      type: Number,
      required: true,
    },

    status: {
      type: String,
      enum: ["paid", "pending"],
      default: "paid",
    },

    paymentDate: {
      type: Date,
      default: Date.now,
    },

    plan: {
      type: String,
      default: "Basic",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Payments", paymentSchema);