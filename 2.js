// Users Service
const express = require('express');
const app = express();
const mongoose = require('mongoose');

// Users model
const User = mongoose.model('User', { name: String, email: String, password: String });

// Create user
app.post('/users', async (req, res) => {
  const user = new User(req.body);
  await user.save();
  res.status(201).json(user);
});

// Get user
app.get('/users/:id', async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json(user);
});

app.listen(3000, () => console.log('Users service running on port 3000'));

// Subscriptions Service
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const axios = require('axios');

// Subscriptions model
const Subscription = mongoose.model('Subscription', { userId: String, type: String, expirationDate: Date });

// Create subscription
app.post('/subscriptions', async (req, res) => {
  const { userId, type, expirationDate } = req.body;
  const { data: user } = await axios.get(`http://users-service/users/${userId}`);
  if (!user) return res.status(404).json({ error: 'User not found' });

  const subscription = new Subscription({ userId, type, expirationDate });
  await subscription.save();
  res.status(201).json(subscription);
});

// Get subscription
app.get('/subscriptions/:id', async (req, res) => {
  const subscription = await Subscription.findById(req.params.id);
  if (!subscription) return res.status(404).json({ error: 'Subscription not found' });
  res.json(subscription);
});

app.listen(3001, () => console.log('Subscriptions service running on port 3001'));

// Auth Service
const express = require('express');
const app = express();
const axios = require('axios');
const jwt = require('jsonwebtoken');

// Login
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const { data: user } = await axios.get(`http://users-service/users?email=${email}`);
  if (!user || user.password !== password) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  const token = jwt.sign({ userId: user.id }, 'secret_key');
  res.json({ token });
});

// Verify token
app.get('/me', async (req, res) => {
  const token = req.headers.authorization;
  try {
    const decoded = jwt.verify(token, 'secret_key');
    const { data: user } = await axios.get(`http://users-service/users/${decoded.userId}`);
    res.json(user);
  } catch (err) {
    res.status(401).json({ error: 'Invalid token' });
  }
});

app.listen(3002, () => console.log('Auth service running on port 3002'));