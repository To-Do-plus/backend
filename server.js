'use strict';


// Express server
const express = require('express');

// .env file
require('dotenv').config();

// CORS: Security
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());
// const mongoose = require('mongoose');
const PORT = process.env.PORT || 3001;

// mongoose.connect(process.env.MONGO_CONNECTION_STRING,
//   { useNewUrlParser: true, useUnifiedTopology: true }
// );

let taskModel = require('./Modules/model.js');
let taskSchema = require('./Modules/schema.js');
const stressFreeTaskEntry = mongoose.model('tasksdatabase', taskSchema);

const { google } = require('googleapis');
const { OAuth2 } = google.auth;
// Clients id and secret from OAuth
const oAuth2Client = new OAuth2('800440768090-n9kc75hsra6cfeq27kvu0fhgc90d1cbb.apps.googleusercontent.com', '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');
oAuth2Client.setCredentials({ refresh_token: '1//04ZR6IoRygN8BCgYIARAAGAQSNgF-L9Ir8SdvuqvlJZKci6ITB754N6Fj60LKWF59TMBCQs7padXdbQqr8nv1TVkZ07Y-vsEVzw' });


app.listen(PORT, () => console.log(`Listening on Port : ${PORT}`));

const calendar = google.calendar({ version: 'v3', auth: oAuth2Client });

const eventStartTime = new Date();
eventStartTime.setDate(eventStartTime.getDay() + 2);

const eventEndTime = new Date();
eventEndTime.setDate(eventEndTime.getDay() + 2);
eventEndTime.setMinutes(eventEndTime.getMinutes() + 45);

const event = {
  summary: 'Meating with dave',
  location: '177 Northwood Lane, Palmyra, NE 68418',
  description: 'meeting with dave to talk about news',
  start: {
    dateTime: eventStartTime,
    timeZone: 'America/Chicago',
  },
  end: {
    dateTime: eventEndTime,
    timeZone: 'America/Chicago',
  },
  colorId: 1,
};

calendar.freebusy.query({
  resource: {
    timeMin: eventStartTime,
    timeMax: eventEndTime,
    timeZone: 'America/Chicago', //google js timezone
    items: [{ id: 'primary' }],
  }
}, (err, res) => {
  if (err) return console.error('Free Busy Error', err);

  const eventsArr = res.data.calendars.primary.busy;

  if (eventsArr.length === 0) return calendar.events.insert(
    { calendarId: 'primary', resource: event },
    err => {
      if (err) return console.error('Calendar Event creation error', err);

      return console.log('Calendar evnet created');
    }
  );
  return console.log(`Sorry I'm busy`);
});


// Route Setups
// Get/Put/Post/Delete Routes

// Seed Array if Any - maybe an enter tasks here? or tester?

// Functions:
// Get Tasks(inc.Auth) / post tasks / delete tasks / put tasks

