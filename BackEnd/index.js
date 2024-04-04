const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); 
const bodyParser = require('body-parser');
const User = require('./models/User');

const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors());
// Middleware
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect("mongodb+srv://sahilbagate8108:Mrsahil%400987@cluster0.uk528fu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
, {
    dbName: "full" 
});

mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});

// Routes
app.post('/api/userprofile', async (req, res) => {
  try {
    const userProfile = await User.create(req.body);
    res.status(201).json(userProfile);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
