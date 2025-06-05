require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

console.log("MONGODB_URI:", process.env.MONGODB_URI); // Debug URI

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err.message, err.stack);
    process.exit(1); // Exit on connection failure
  });

const equipmentSchema = new mongoose.Schema({
  category: String,
  title: String,
  how_much: Number,
  creation_year: Number,
  price_usd: Number,
  period_of_operation: String,
  origin: String,
  description: String,
});

const Equipment = mongoose.model("Equipment", equipmentSchema);

app.get("/api/equipment", async (req, res) => {
  try {
    console.log("Fetching all equipment"); // Debug
    const equipment = await Equipment.find();
    res.json(equipment);
  } catch (err) {
    console.error("Error in /api/equipment:", err.message, err.stack);
    res.status(500).json({ message: "Server error: " + err.message });
  }
});

app.get("/api/equipment/:id", async (req, res) => {
  try {
    console.log(`Fetching equipment ID: ${req.params.id}`); // Debug
    const equipment = await Equipment.findById(req.params.id);
    if (!equipment)
      return res.status(404).json({ message: "Equipment not found" });
    res.json(equipment);
  } catch (err) {
    console.error("Error in /api/equipment/:id:", err.message, err.stack);
    res.status(500).json({ message: "Server error: " + err.message });
  }
});

app.post("/api/equipment", async (req, res) => {
  const equipment = new Equipment(req.body);
  try {
    console.log("Creating new equipment:", req.body); // Debug
    const newEquipment = await equipment.save();
    res.status(201).json(newEquipment);
  } catch (err) {
    console.error("Error in POST /api/equipment:", err.message, err.stack);
    res.status(400).json({ message: "Bad request: " + err.message });
  }
});

app.put("/api/equipment/:id", async (req, res) => {
  try {
    console.log(`Updating equipment ID: ${req.params.id}`, req.body); // Debug
    const equipment = await Equipment.findById(req.params.id);
    if (!equipment)
      return res.status(404).json({ message: "Equipment not found" });
    Object.assign(equipment, req.body);
    const updatedEquipment = await equipment.save();
    res.json(updatedEquipment);
  } catch (err) {
    console.error("Error in PUT /api/equipment/:id:", err.message, err.stack);
    res.status(400).json({ message: "Bad request: " + err.message });
  }
});

app.delete("/api/equipment/:id", async (req, res) => {
  try {
    console.log(`Deleting equipment ID: ${req.params.id}`); // Debug
    const equipment = await Equipment.findById(req.params.id);
    if (!equipment)
      return res.status(404).json({ message: "Equipment not found" });
    await equipment.deleteOne();
    res.json({ message: "Equipment deleted" });
  } catch (err) {
    console.error(
      "Error in DELETE /api/equipment/:id:",
      err.message,
      err.stack
    );
    res.status(500).json({ message: "Server error: " + err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
