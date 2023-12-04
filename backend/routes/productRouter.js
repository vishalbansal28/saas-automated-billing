const express = require("express");
const router = express.Router();
const Product = require("../models/productmodel");

// GET products by email
router.get("/product/:email", async (req, res) => {
  const email = req.params.email;
  console.log(email);

  try {
    // Find data based on the provided email
    const userData = await Product.find({ email });
    console.log("Abhiram");
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
