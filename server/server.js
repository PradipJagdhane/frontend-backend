const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bodyParser = require("body-parser");
const authRoutes = require("./routes/auth");
const cors = require("cors");
// dotenv.config(); 
require('dotenv').config();


const corsOptions = {
  origin: 'http://localhost:3000',  // Frontend URL
  credentials: true, // This allows cookies to be sent
  optionsSuccessStatus: 200 // Some legacy browsers choke on status 204
};

const app = express();
app.use(cors(corsOptions));
app.use(bodyParser.json());
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json()); 




// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.log('Error connecting to MongoDB:', err);
});

// Routes
app.use('/api/auth', authRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
