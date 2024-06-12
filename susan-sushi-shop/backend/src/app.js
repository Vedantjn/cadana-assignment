const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const orderRoutes = require('./routes/orderRoutes');
require('dotenv').config();


const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });

app.use(express.json());
app.use('/api', orderRoutes);


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});