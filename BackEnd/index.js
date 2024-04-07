const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const { Resend } = require('resend');
require('dotenv').config();

const User = require('./models/User');

const app = express();
const PORT = process.env.PORT || 3000;

const resend = new Resend(process.env.ResendApiKey);

app.use(cors());
app.use(bodyParser.json());

// Serve static files
app.use(express.static(path.join(__dirname, '../FrontEnd/dist')));

// Handle API routes
app.post('/api/userprofile', async (req, res) => {
  try {
    const userProfile = await User.create(req.body);
    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: userProfile.email,
      subject: 'Dribble Verification',
      html: `<p>Welcome to dribble <strong>${userProfile.name}</strong>!</p>`
    });
    console.log(`Email sent to ${userProfile.email}`);
    res.status(201).json(userProfile);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

app.post('/api/userprofile2', async (req, res) => {
  try {
    const userProfile = req.body;
    console.log(`Email sent to ${userProfile.email}`);
    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: userProfile.email,
      subject: 'Dribble Verification',
      html: `<p>Welcome to dribble <strong>${userProfile.name}</strong>!</p>`
    });
    console.log(`Email sent to ${userProfile.email}`);
    res.status(201).json(userProfile);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

app.get('/api/checkUsername/:username', async (req, res) => {
  try {
    const { username } = req.params;
    const existingUser = await User.findOne({ username });
    res.json({ exists: !!existingUser });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

app.get('/api/userInformation/:username', async (req, res) => {
  try {
    const username = req.params.username;
    const user = await User.findOne({ username });
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error('Error fetching user information:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, '../FrontEnd/dist', 'index.html'));
// });

// Start the server
async function startServer() {
  try {
    await connectToMongoDB();
    app.listen(PORT, () => {
      console.log(`Server started on ${PORT}`);
    });
  } catch (error) {
    console.error('Error starting server:', error);
  }
}

startServer();

// MongoDB connection function
async function connectToMongoDB() {
  try {
    await mongoose.connect(process.env.MongoUrl, { dbName: "full" });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error;
  }
}
