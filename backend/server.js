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
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      tls: {
        rejectUnauthorized: false
      }
    });

    const now = new Date();
    const timestamp = now.toLocaleString('en-IN', { dateStyle: 'long', timeStyle: 'short', timeZone: 'Asia/Kolkata' });
    const initials = name.trim().split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);

    const htmlBody = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1.0"/>
  <title>New Portfolio Message</title>
</head>
<body style="margin:0;padding:0;background:#08090c;font-family:'Segoe UI',system-ui,Arial,sans-serif;">

  <!-- Outer wrapper -->
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#08090c;padding:48px 16px;">
    <tr><td align="center">

      <!-- Card -->
      <table width="620" cellpadding="0" cellspacing="0" style="max-width:620px;width:100%;border-radius:20px;overflow:hidden;border:1px solid #1e2030;background:#0d0f1a;">

        <!-- ── HEADER ── -->
        <tr>
          <td style="background:linear-gradient(135deg,#0f172a 0%,#1e1b4b 40%,#0f172a 100%);padding:0;position:relative;text-align:center;">

            <!-- Top glow bar -->
            <div style="height:3px;background:linear-gradient(90deg,transparent,#6366f1,#a78bfa,#38bdf8,transparent);"></div>

            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td style="padding:40px 48px 36px;text-align:center;">

                  <!-- Logo mark -->
                  <div style="display:inline-block;width:52px;height:52px;border-radius:14px;background:linear-gradient(135deg,#6366f1,#a78bfa);line-height:52px;font-size:22px;font-weight:900;color:#fff;letter-spacing:-1px;margin-bottom:20px;">RP</div>

                  <p style="margin:0 0 8px;font-size:10px;letter-spacing:4px;color:#6366f1;text-transform:uppercase;font-weight:600;">Portfolio Notification</p>
                  <h1 style="margin:0 0 10px;font-size:28px;font-weight:800;color:#f8fafc;letter-spacing:-0.5px;line-height:1.2;">You've got a new message!</h1>
                  <p style="margin:0;font-size:13px;color:#64748b;">Someone reached out via your portfolio contact form</p>

                  <!-- Timestamp badge -->
                  <div style="display:inline-block;margin-top:18px;padding:6px 16px;background:rgba(99,102,241,0.12);border:1px solid rgba(99,102,241,0.25);border-radius:100px;font-size:11px;color:#818cf8;letter-spacing:0.5px;">
                    🕐 ${timestamp} IST
                  </div>

                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- ── SENDER CARD ── -->
        <tr>
          <td style="padding:32px 40px 0;">
            <p style="margin:0 0 12px;font-size:10px;letter-spacing:3px;color:#475569;text-transform:uppercase;font-weight:600;">Sender Details</p>
            <table width="100%" cellpadding="0" cellspacing="0" style="background:#131625;border:1px solid #1e2130;border-radius:14px;overflow:hidden;">

              <!-- Avatar + Name row -->
              <tr>
                <td style="padding:20px 24px 12px 24px;border-bottom:1px solid #1e2130;">
                  <table cellpadding="0" cellspacing="0">
                    <tr>
                      <td style="vertical-align:middle;padding-right:14px;">
                        <!-- Avatar circle — table-safe, no flex -->
                        <table cellpadding="0" cellspacing="0">
                          <tr>
                            <td width="48" height="48" style="width:48px;height:48px;border-radius:50%;background:linear-gradient(135deg,#6366f1 0%,#38bdf8 100%);text-align:center;vertical-align:middle;font-size:17px;font-weight:800;color:#ffffff;letter-spacing:-0.5px;">
                              ${initials}
                            </td>
                          </tr>
                        </table>
                      </td>
                      <td style="vertical-align:middle;">
                        <p style="margin:0 0 2px;font-size:17px;font-weight:700;color:#f1f5f9;line-height:1.2;">${name}</p>
                        <p style="margin:0;font-size:10px;letter-spacing:2px;color:#475569;text-transform:uppercase;">Contact Person</p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>

              <!-- Email row -->
              <tr>
                <td style="padding:14px 24px;border-bottom:1px solid #1e2130;">
                  <p style="margin:0 0 3px;font-size:9px;letter-spacing:2.5px;color:#475569;text-transform:uppercase;font-weight:600;">Email Address</p>
                  <a href="mailto:${email}" style="font-size:14px;font-weight:600;color:#818cf8;text-decoration:none;">${email}</a>
                </td>
              </tr>

              <!-- Badges row -->
              <tr>
                <td style="padding:12px 24px 16px;">
                  <span style="display:inline-block;padding:5px 13px;background:rgba(99,102,241,0.1);border:1px solid rgba(99,102,241,0.25);border-radius:100px;font-size:10px;color:#a5b4fc;font-weight:700;letter-spacing:0.5px;">📎 Via Portfolio</span>
                </td>
              </tr>

            </table>
          </td>
        </tr>

        <!-- ── MESSAGE ── -->
        <tr>
          <td style="padding:28px 40px 0;">
            <p style="margin:0 0 12px;font-size:10px;letter-spacing:3px;color:#475569;text-transform:uppercase;font-weight:600;">Message</p>
            <table width="100%" cellpadding="0" cellspacing="0" style="background:#131625;border:1px solid #1e2130;border-radius:14px;overflow:hidden;">
              <tr>
                <td style="padding:0;">
                  <!-- Top accent bar -->
                  <div style="height:2px;background:linear-gradient(90deg,#6366f1,#38bdf8,transparent);border-radius:2px 2px 0 0;"></div>
                  <div style="padding:24px 28px;">
                    <p style="margin:0;font-size:15px;line-height:1.85;color:#cbd5e1;white-space:pre-wrap;">${message}</p>
                  </div>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- ── CTA ── -->
        <tr>
          <td style="padding:32px 40px 0;text-align:center;">
            <a href="mailto:${email}?subject=Re%3A%20Your%20message%20to%20Raju%20Perumalla&body=Hi%20${encodeURIComponent(name)}%2C%0A%0A"
               style="display:inline-block;padding:15px 44px;background:linear-gradient(135deg,#6366f1 0%,#818cf8 50%,#38bdf8 100%);color:#ffffff;text-decoration:none;border-radius:12px;font-size:15px;font-weight:700;letter-spacing:0.3px;box-shadow:0 8px 32px rgba(99,102,241,0.35);">
              ↩&nbsp;&nbsp;Reply to ${name}
            </a>
            <p style="margin:12px 0 0;font-size:11px;color:#334155;">Clicking will open your email client with a pre-filled reply</p>
          </td>
        </tr>

        <!-- ── DIVIDER ── -->
        <tr>
          <td style="padding:36px 40px 0;">
            <div style="height:1px;background:linear-gradient(90deg,transparent,#1e2130,transparent);"></div>
          </td>
        </tr>

        <!-- ── FOOTER ── -->
        <tr>
          <td style="padding:28px 40px 36px;text-align:center;">
            <p style="margin:0 0 4px;font-size:14px;font-weight:800;color:#64748b;letter-spacing:2px;text-transform:uppercase;">Raju Perumalla</p>
            <p style="margin:0 0 18px;font-size:11px;color:#334155;">Full-Stack &nbsp;·&nbsp; Android &nbsp;·&nbsp; ML Engineer</p>
            <!-- Social links -->
            <table cellpadding="0" cellspacing="0" align="center" style="margin-bottom:20px;">
              <tr>
                <td style="padding:0 10px;">
                  <a href="https://github.com/rajuperumalla9515" style="font-size:12px;color:#475569;text-decoration:none;font-weight:500;">GitHub</a>
                </td>
                <td style="color:#1e2130;font-size:12px;">|</td>
                <td style="padding:0 10px;">
                  <a href="https://www.instagram.com/impressive_dev_34" style="font-size:12px;color:#475569;text-decoration:none;font-weight:500;">Instagram</a>
                </td>
                <td style="color:#1e2130;font-size:12px;">|</td>
                <td style="padding:0 10px;">
                  <a href="mailto:${process.env.EMAIL_USER}" style="font-size:12px;color:#475569;text-decoration:none;font-weight:500;">Email</a>
                </td>
              </tr>
            </table>
            <p style="margin:0;font-size:10px;color:#1e2130;">© ${now.getFullYear()} Raju Perumalla · Auto-generated from portfolio contact form</p>
          </td>
        </tr>

        <!-- Bottom glow bar -->
        <tr>
          <td style="padding:0;">
            <div style="height:3px;background:linear-gradient(90deg,transparent,#6366f1,#a78bfa,#38bdf8,transparent);"></div>
          </td>
        </tr>

      </table>

    </td></tr>
  </table>

</body>
</html>`;

    // Setup email data
    const mailOptions = {
      from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      replyTo: email,
      subject: `New Message from ${name} — Portfolio`,
      text: `New portfolio message from ${name} (${email}):\n\n${message}`,
      html: htmlBody,
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
