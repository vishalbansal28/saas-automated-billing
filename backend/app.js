const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const dataRouter = require("./routes/dataRouter");
const productRouter = require("./routes/productRouter");
const app = express();
dotenv.config();

app.use(cors());

const PORT = process.env.PORT || 5000;

mongoose.connect(
  "mongodb+srv://abhiramtripathimanit:Abhiram123@cluster0.cj57lc2.mongodb.net/",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);
const db = mongoose.connection;

// Event listener for successful connection
db.on("connected", () => {
  console.log("Connected to MongoDB");
});

// Event listener for connection error
db.on("error", (err) => {
  console.error("MongoDB connection error:", err);
});

// Event listener for when the MongoDB connection is disconnected
db.on("disconnected", () => {
  console.log("Disconnected from MongoDB");
});

app.use(express.json());
app.get("/", (req, res) => {
  res.send("Welcome to Billing APP");
});
app.use("/", dataRouter);
app.use("/", productRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
