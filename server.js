'use strict';

// Require brings the outside packages in

// Express server
const express = require('express')

// .env file
require('dotenv').config();

// CORS: Security
const cors = require('cors')

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => console.log('Listening on Port :', PORT));