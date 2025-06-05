const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const equipmentRoutes = require("./routes/equipment");

const app = express();
app.use(cors());
app.use(express.json());

mongoose
  .connect("mongodb://localhost:27017/Handbook", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connected to Handbook database");
  })
  .catch((err) => console.error("MongoDB connection error:", err.message));

app.use("/api/equipment", equipmentRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
