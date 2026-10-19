const express = require("express");
const Contact = require("../models/Contact");

const router = express.Router();


// ==========================================
// POST CONTACT FORM
// ==========================================

router.post("/", async (req, res) => {
  try {
    const {
      name,
      gymName,
      contact,
      message,
    } = req.body;

    // Validation
    if (!name || !contact || !message) {
      return res.status(400).json({
        message:
          "Name, email/phone and message are required.",
      });
    }

    // Create contact
    const savedContact =
      await Contact.create({
        name: name.trim(),

        gymName: gymName
          ? gymName.trim()
          : "",

        contact: contact.trim(),

        message: message.trim(),
      });

    res.status(201).json({
      success: true,

      message:
        "Your message has been sent successfully.",

      contact: savedContact,
    });

  } catch (error) {

    console.error(
      "Contact form error:",
      error
    );

    res.status(500).json({
      success: false,

      message:
        "Server error. Could not save your message.",
    });
  }
});


// ==========================================
// GET ALL CONTACT MESSAGES
// ==========================================

router.get("/", async (req, res) => {
  try {

    const contacts =
      await Contact.find()
        .sort({
          createdAt: -1,
        });

    res.status(200).json(
      contacts
    );

  } catch (error) {

    console.error(
      "Get contacts error:",
      error
    );

    res.status(500).json({
      message:
        "Could not fetch contact messages.",
    });
  }
});


module.exports = router;