require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const app = express();

app.use(cors({ origin: ['https://generalhandbook.vercel.app', 'http://localhost:8080'] }));
app.use(express.json());

// Debug environment variable loading
console.log('Loaded environment variables:', JSON.stringify(process.env, null, 2));

// Extract and validate MONGODB_URI
const MONGODB_URI = (process.env.MONGODB_URI || '').trim();
console.log('Raw MONGODB_URI from process.env:', MONGODB_URI ? MONGODB_URI.replace(/:\/\/[^@]+@/, '://<redacted>@') : 'Not set');

if (!MONGODB_URI || MONGODB_URI.includes('localhost') || MONGODB_URI.includes('127.0.0.1') || !MONGODB_URI.startsWith('mongodb+srv://')) {
  console.error('Error: MONGODB_URI is invalid or not set. Expected MongoDB Atlas URI (mongodb+srv://...). Current value:', MONGODB_URI);
  process.exit(1);
}

if (/\s/.test(MONGODB_URI)) {
  console.error('Error: MONGODB_URI contains invalid whitespace characters. Current value:', MONGODB_URI);
  process.exit(1);
}

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000,
  maxPoolSize: 10,
  retryWrites: true,
  retryReads: true,
  connectTimeoutMS: 10000,
  socketTimeoutMS: 45000,
}).then(() => {
  console.log('Connected to MongoDB Atlas');
}).catch(err => {
  console.error('MongoDB connection error:', err.message, err.stack);
  process.exit(1);
});

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const User = mongoose.model('User', userSchema);

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

const Equipment = mongoose.model('Equipment', equipmentSchema);

// Middleware to verify JWT
const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'No token provided' });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid token' });
    req.user = user;
    next();
  });
};

// Register endpoint with bcrypt
app.post('/api/register', async (req, res) => {
  const { username, password } = req.body;
  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) return res.status(400).json({ message: 'Username already exists' });

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const user = new User({ username, password: hashedPassword });
    const savedUser = await user.save(); // Capture the saved result
    console.log('User saved:', savedUser); // Log the saved user
    res.status(201).json({ message: 'User registered' });
  } catch (err) {
    console.error('Error in /api/register:', err.message, err.stack);
    res.status(500).json({ message: 'Server error: ' + err.message });
  }
});

// Login endpoint
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (err) {
    console.error('Error in /api/login:', err.message, err.stack);
    res.status(500).json({ message: 'Server error: ' + err.message });
  }
});

// Health check route
app.get('/', (req, res) => {
  res.json({ message: 'General\'s Handbook Backend is running', status: 'healthy' });
});

app.get('/api/equipment', async (req, res) => {
  try {
    console.log('Fetching all equipment');
    const equipment = await Equipment.find().maxTimeMS(30000);
    res.json(equipment);
  } catch (err) {
    console.error('Error in /api/equipment:', err.message, err.stack);
    res.status(500).json({ message: 'Server error: ' + err.message });
  }
});

app.get('/api/equipment/:id', async (req, res) => {
  try {
    console.log(`Fetching equipment ID: ${req.params.id}`);
    const equipment = await Equipment.findById(req.params.id).maxTimeMS(30000);
    if (!equipment) return res.status(404).json({ message: 'Equipment not found' });
    res.json(equipment);
  } catch (err) {
    console.error('Error in /api/equipment/:id:', err.message, err.stack);
    res.status(500).json({ message: 'Server error: ' + err.message });
  }
});

app.post('/api/equipment', authenticateToken, async (req, res) => {
  const equipment = new Equipment(req.body);
  try {
    console.log('Creating new equipment:', req.body);
    const newEquipment = await equipment.save();
    res.status(201).json(newEquipment);
  } catch (err) {
    console.error('Error in POST /api/equipment:', err.message, err.stack);
    res.status(400).json({ message: 'Bad request: ' + err.message });
  }
});

app.put('/api/equipment/:id', authenticateToken, async (req, res) => {
  try {
    console.log(`Updating equipment ID: ${req.params.id}`, req.body);
    const equipment = await Equipment.findById(req.params.id);
    if (!equipment) return res.status(404).json({ message: 'Equipment not found' });
    Object.assign(equipment, req.body);
    const updatedEquipment = await equipment.save();
    res.json(updatedEquipment);
  } catch (err) {
    console.error('Error in PUT /api/equipment/:id:', err.message, err.stack);
    res.status(400).json({ message: 'Bad request: ' + err.message });
  }
});

app.delete('/api/equipment/:id', authenticateToken, async (req, res) => {
  try {
    console.log(`Deleting equipment ID: ${req.params.id}`);
    const equipment = await Equipment.findById(req.params.id);
    if (!equipment) return res.status(404).json({ message: 'Equipment not found' });
    await equipment.deleteOne();
    res.json({ message: 'Equipment deleted' });
  } catch (err) {
    console.error('Error in DELETE /api/equipment/:id:', err.message, err.stack);
    res.status(500).json({ message: 'Server error: ' + err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err.message, err.stack);
  process.exit(1);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});