const express = require("express");
const router = express.Router();
const Data = require("../models/datamodel");

// POST data
router.post("/", async (req, res) => {
  try {
    const newData = new Data(req.body);
    const savedData = await newData.save();
    res.status(201).json(savedData);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const allData = await Data.find();
    res.status(200).json(allData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.get("/data/:email", async (req, res) => {
  const email = req.params.email;

  try {
    // Find data based on the provided email
    const userData = await Data.findOne({ email: email });

    if (!userData) {
      return res
        .status(404)
        .json({ message: "Data not found for the provided email." });
    }

    res.status(200).json(userData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
