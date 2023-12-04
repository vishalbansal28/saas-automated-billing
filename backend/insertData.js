const mongoose = require("mongoose");
const Product = require("../backend/models/productmodel"); // Assuming your model is in the models directory

// Connect to MongoDB
mongoose.connect(
  "mongodb+srv://abhiramtripathimanit:Abhiram123@cluster0.cj57lc2.mongodb.net/",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const db = mongoose.connection;

// Event listener for successful connection
db.on("connected", async () => {
  console.log("Connected to MongoDB");

  const sampleData = [
    {
      email: "user1@example.com",
      features: "Spring and summershoes",
      price: 20,
      discountedPrice: 55,
      durationUsed: 3,
      total: 60,
    },
    {
      email: "user2@example.com",
      features: "TC Reusable Silicone Magic Washing Gloves",
      price: 29,
      discountedPrice: 56,
      durationUsed: 2,
      total: 58,
    },
    {
      email: "user3@example.com",
      features: "Oil Free Moisturizer 100ml",
      price: 40,
      discountedPrice: 70,
      durationUsed: 2,
      total: 80,
    },
    // Add more sample data as needed
  ];

  try {
    // Save dummy data to MongoDB
    const savedData = await Product.insertMany(sampleData);
    console.log("Dummy data inserted successfully:", savedData);
  } catch (error) {
    console.error("Error inserting dummy data:", error);
  } finally {
    // Close the MongoDB connection
    mongoose.connection.close(() => {
      console.log("MongoDB connection closed");
      process.exit(0);
    });
  }
});

// Event listener for connection error
db.on("error", (err) => {
  console.error("MongoDB connection error:", err);
});
