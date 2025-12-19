const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

const authRouter = require('./routes/authRouter');
const productRouter = require('./routes/productRouter');

require('dotenv').config();
require('./models/db');

const PORT = process.env.PORT || 8080;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Routes
app.get('/ping', (req, res) => res.send('PONG'));
app.use('/auth', authRouter);
app.use('/products', productRouter);

// Start server
app.listen(PORT, () => console.log(`Server is running on ${PORT}`));
