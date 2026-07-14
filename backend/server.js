require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const nodemailer = require('nodemailer');
const Contact = require('./models/Contact');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
// Note: In mongoose v6+, useNewUrlParser and useUnifiedTopology are default true and no longer needed,
// but they don't hurt. We'll leave them out for cleaner code if preferred, or keep them.
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/portfolio')
.then(() => console.log('MongoDB Connected successfully'))
.catch(err => console.error('MongoDB connection error:', err));

// Basic Route
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Backend is running!' });
});

// Contact Route
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, message } = req.body;
    
    // Basic validation
    if (!name || !email || !message) {
      return res.status(400).json({ success: false, message: 'Please provide all required fields.' });
    }

    const newContact = new Contact({ name, email, message });
    await newContact.save();
    
    // Set up Nodemailer transporter with robust Gmail settings
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      tls: {
        rejectUnauthorized: false
      }
    });

    // Setup email data
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER, // Send it to yourself
      subject: `New Portfolio Message from ${name}`,
      text: `You have received a new message from your portfolio contact form.\n\nName: ${name}\nEmail: ${email}\nMessage:\n${message}`,
    };

    // Send the email (do this asynchronously so we don't delay the response to the user, but we'll await it here for simplicity and to catch errors if needed, or just send and log)
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });

    res.status(201).json({ success: true, message: 'Message sent successfully!' });
  } catch (error) {
    console.error('Error saving contact message:', error);
    res.status(500).json({ success: false, message: 'Server error, please try again later.' });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
