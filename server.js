'use strict';

const { google } = require('googleapis');
const { OAuth2 } = google.auth;

// Clients id and secret from OAuth
// replace with user OAuth later
const oAuth2Client = new OAuth2(
  '774089597563-vfgg6t8ko1jdpjajqareefrhjpub04cc.apps.googleusercontent.com',
  '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'
);

oAuth2Client.setCredentials({
  refresh_token:
    '1//04Z_M4ot-uiBZCgYIARAAGAQSNwF-L9IrFJM0xdGESI2AbGIjeq9bxxaTPghrpzWin-XDrWZByB59OoDdcd5-OefAQF2WWSrDz2s'
});

const calendar = google.calendar({version: 'v3', auth: oAuth2Client});

const eventStartTime = new Date();
eventStartTime.setDate(eventStartTime.getDay() + 2);

const eventEndTime = new Date();
eventEndTime.setDate(eventEndTime.getDay() + 2);
eventEndTime.setMinutes(eventEndTime.getMinutes() + 45);

const event = {
  summary: 'Meeting with joe',
  location: '177 Northwood Lane, Palmyra, NE 68418',
  description: 'meeting with dave to talk about news',
  start: {
    dateTime: eventStartTime,
    timeZone: 'America/Chicago',
  },
  end:{
    dateTime: eventEndTime,
    timeZone: 'America/Chicago',
  },
  colorId: 1,
};

calendar.freebusy.query(
  {
    resource: {
      timeMin: eventStartTime,
      timeMax: eventEndTime,
      timeZone: 'America/Chicago', //google js timezone
      items: [{id: 'primary'}],
    },
  },
  (err, res) => {
    if (err) {
      return console.error('Free Busy Query Error: ', err);
    }
    const eventsArr = res.data.calendars.primary.busy;

    if (eventsArr.length === 0) {
      return calendar.events.insert({calendarId: 'primary', resource: event},
        err => {
          if (err) {
            return console.error('Calendar Event creation error', err);
          }
          return console.log('Calendar event created');
        }
      );
    }
    return console.log(`Sorry I'm busy`);
  }
);


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

app.listen(PORT, () => console.log(`Listening on Port : ${PORT}`));
