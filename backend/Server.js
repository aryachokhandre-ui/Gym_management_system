const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const Trial = require("./models/Trials");
const Member = require("./models/Members");
const Attendance = require("./models/Attendance");
const Payment = require("./models/Payments");
const contactRoutes = require("./routes/contactRoutes");

const app = express();


// ================= MIDDLEWARE =================

app.use(cors());
app.use(express.json());


app.use(
  "/api/contact",
  contactRoutes
);

// ================= HOME ROUTE =================

app.get("/", (req, res) => {
  res.send("Gym Management Backend Running");
});


// ================= TRIAL FORM =================

app.post("/api/trial", async (req, res) => {
  try {

    const {
      ownerName,
      gymName,
      contact,
      plan,
      agreed
    } = req.body;


    // ================= VALIDATION =================

    if (!ownerName || !gymName || !contact || !plan) {
      return res.status(400).json({
        message: "Please fill all required fields"
      });
    }


    if (!agreed) {
      return res.status(400).json({
        message: "Please agree to the Terms and Policies"
      });
    }


    // ================= CREATE TRIAL =================

    const newTrial = new Trial({
      ownerName: ownerName,
      gymName: gymName,
      contact: contact,
      plan: plan,
      agreed: agreed
    });


    // ================= SAVE TO MONGODB =================

    await newTrial.save();


    // ================= SUCCESS RESPONSE =================

    res.status(201).json({
      message: "7-Day Free Trial claimed successfully!",
      trial: newTrial
    });

  } catch (error) {

    console.log("Trial Error:", error);

    res.status(500).json({
      message: "Server error",
      error: error.message
    });

  }
});

// ================= DASHBOARD STATS =================

app.get("/api/dashboard/stats", async (req, res) => {
  try {
    const now = new Date();

    // Start of today
    const startOfDay = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate()
    );

    // End of today
    const endOfDay = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() + 1
    );

    // Start of current month
    const startOfMonth = new Date(
      now.getFullYear(),
      now.getMonth(),
      1
    );

    // Start of next month
    const startOfNextMonth = new Date(
      now.getFullYear(),
      now.getMonth() + 1,
      1
    );

    // Active members
    const activeMembers = await Member.countDocuments({
      status: "active",
    });

    // Today's check-ins
    const todayCheckins = await Attendance.countDocuments({
      checkIn: {
        $gte: startOfDay,
        $lt: endOfDay,
      },
    });

    // Monthly revenue
    const revenueResult = await Payment.aggregate([
      {
        $match: {
          status: "paid",
          paymentDate: {
            $gte: startOfMonth,
            $lt: startOfNextMonth,
          },
        },
      },
      {
        $group: {
          _id: null,
          total: {
            $sum: "$amount",
          },
        },
      },
    ]);

    // Pending amount
    const pendingResult = await Payment.aggregate([
      {
        $match: {
          status: "pending",
        },
      },
      {
        $group: {
          _id: null,
          total: {
            $sum: "$amount",
          },
        },
      },
    ]);

    const monthlyRevenue =
      revenueResult.length > 0
        ? revenueResult[0].total
        : 0;

    const pendingAmount =
      pendingResult.length > 0
        ? pendingResult[0].total
        : 0;

    res.json({
      activeMembers,
      monthlyRevenue,
      todayCheckins,
      pendingAmount,
    });

  } catch (error) {

    console.log("Dashboard Stats Error:", error);

    res.status(500).json({
      message: "Failed to load dashboard statistics",
      error: error.message,
    });
  }
});

// ADD MEMBER
app.post("/api/members", async (req, res) => {
  try {
    const { name, email, phone, plan, status, planPrice } = req.body;

    if (!name || !plan) {
      return res.status(400).json({
        message: "Name and plan are required",
      });
    }

    const newMember = new Member({
      name,
      email,
      phone,
      plan,
      status: status || "active",
      planPrice: planPrice || 0,
    });

    const savedMember = await newMember.save();

    res.status(201).json({
      message: "Member added successfully",
      member: savedMember,
    });
  } catch (error) {
    console.error("Error adding member:", error);

    res.status(500).json({
      message: "Failed to add member",
      error: error.message,
    });
  }
});
// ================= MONGODB CONNECTION =================

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {

    console.log("MongoDB Connected");

    // ================= START SERVER =================

    app.listen(5000, () => {

      console.log(
        "Server running on http://localhost:5000"
      );

    });

  })
  .catch((error) => {

    console.log("MongoDB Error:", error);

  });