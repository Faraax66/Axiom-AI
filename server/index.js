const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();

const githubRoutes = require('./routes/github');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(helmet());
app.use(cors());

// Routes
app.use('/github', githubRoutes);

// Health check
app.get('/', (req, res) => {
  res.json({ 
    message: 'Axiom AI backend is running 🚀',
    status: 'OK'
  });
});

// Temp Gemini test route
app.get('/test-gemini', async (req, res) => {
  const { reviewCode } = require('./utils/gemini');
  const fakeDiff = `+ const query = "SELECT * FROM users WHERE id = " + userId;`;
  try {
    const review = await reviewCode(fakeDiff);
    res.json(review);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Axiom AI server running on port ${PORT}`);
});