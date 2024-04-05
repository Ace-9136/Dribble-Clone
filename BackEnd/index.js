const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); 
const bodyParser = require('body-parser');
const User = require('./models/User');
const { Resend } = require('resend'); 
require('dotenv').config();
const path = require('path');

const resend = new Resend(process.env.ResendApiKey);
const app = express();
const website = express();
const PORT = process.env.PORT || 3000;
app.use(cors());
app.use(bodyParser.json());

async function connectToMongoDB() {
  try {
      await mongoose.connect(process.env.MongoUrl, { dbName: "full" });
      console.log('Connected to MongoDB');
  } catch (error) {
      console.error('Error connecting to MongoDB:', error);
  }
}
website.use(express.static('../FrontEnd/dist'));
website.use((req,res,next)=>{
    res.sendFile(path.join(__dirname, '../FrontEnd/dist', 'index.html'));
});
app.post('/api/userprofile', async (req, res) => {
  try {
    const userProfile = await User.create(req.body);
    resend.emails.send({
      from: 'onboarding@resend.dev',
      to: userProfile.email,
      subject: 'Dribble Verification',
      html: `<p>Welcome to dribble <strong>${userProfile.name}</strong>!</p>`
    });
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
    if (existingUser) {
      res.json({ exists: true });
    } else {
      res.json({ exists: false });
    }
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

async function startServer() {
  await connectToMongoDB();
  app.listen(PORT, () => {
      console.log(`Server started on ${PORT}`);
  });
}

website.listen(8000, () => {
  console.log(`Server started on 8000`);
});

startServer();
