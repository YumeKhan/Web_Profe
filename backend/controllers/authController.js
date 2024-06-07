const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

exports.register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword });

    // Send email
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Account Created',
      text: 'Your account has been created successfully!'
    };
    await transporter.sendMail(mailOptions);

    res.status(201).json({ message: 'User created', user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (user && await bcrypt.compare(password, user.password)) {
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

      // Send email
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Login Notification',
        text: 'You have successfully logged in!'
      };
      await transporter.sendMail(mailOptions);

      res.json({ message: 'Login successful', token });
    } else {
      res.status(400).json({ error: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.recover = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (user) {
      // Implement password recovery logic (e.g., send reset link)
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Password Recovery',
        text: 'Password recovery instructions'
      };
      await transporter.sendMail(mailOptions);

      res.json({ message: 'Recovery email sent' });
    } else {
      res.status(400).json({ error: 'Email not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
