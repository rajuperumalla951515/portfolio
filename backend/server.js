require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

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

    const now = new Date();
    const timestamp = now.toLocaleString('en-IN', { dateStyle: 'long', timeStyle: 'short', timeZone: 'Asia/Kolkata' });
    const initials = name.trim().split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);

    // EmailJS API Integration
    const emailJsPayload = {
      service_id: process.env.EMAILJS_SERVICE_ID,
      template_id: process.env.EMAILJS_TEMPLATE_ID,
      user_id: process.env.EMAILJS_PUBLIC_KEY, // This is your Public Key
      accessToken: process.env.EMAILJS_PRIVATE_KEY, // Required for secure API calls
      template_params: {
        from_name: name,
        reply_to: email,
        message: message,
        timestamp: timestamp,
        initials: initials
      }
    };

    try {
      const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(emailJsPayload)
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('EmailJS Error:', errorText);
      } else {
        console.log('Email sent via EmailJS successfully!');
      }
    } catch (emailError) {
      console.error('Failed to contact EmailJS API:', emailError);
    }

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
