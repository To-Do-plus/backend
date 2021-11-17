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
const mongoose = require('mongoose');
const PORT = process.env.PORT || 3001;

// const { google } = require('googleapis');
// const { OAuth2 } = google.auth;
// // Clients id and secret from OAuth
// const clientId = '800440768090-n9kc75hsra6cfeq27kvu0fhgc90d1cbb.apps.googleusercontent.com';
// const oAuth2Client = new OAuth2(`${clientId}`,'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');
// oAuth2Client.setCredentials({refresh_token:'1//04ZR6IoRygN8BCgYIARAAGAQSNgF-L9Ir8SdvuqvlJZKci6ITB754N6Fj60LKWF59TMBCQs7padXdbQqr8nv1TVkZ07Y-vsEVzw'});


mongoose.connect(process.env.MONGO_CONNECTION_STRING,
  { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error'));
db.once('open', () => console.log('db is connected'));

app.get('/', (request, response) => response.status(200).send('This is the root. It works!'));
app.get('/test', (req, res) => {
  res.send('test');
});
app.get('/clear', bombTheBase);
app.get('/seed', sample);

app.get('/events', getEvent);
app.post('/events', postEvent);
app.delete('/events/:id', deleteEvent);
app.put('/events/:id', putEvent);


app.listen(PORT, () => console.log(`Listening on Port : ${PORT}`));


let Event = require('./modules/schema.js');

async function getEvent(req, res) {
  try {
    console.log(req.query);
    let filterQ = {};
    if (req.query.status) {
      let { status } = req.query;
      filterQ.status = status;
    }
    const item = await Event.find(filterQ);
    res.status(200).send(item);
  }

  catch (err) {
    res.status(500).send('error posting: ', err.message);
  }
}

async function postEvent(req, res) {
  let newEvent = req.body;
  console.log(newEvent);
  // .status(200).send('Connected');

  try {
    let postEntry = new Event(newEvent);
    postEntry.save();
    res.status(200).send(postEntry);
  }

  catch (err) {
    res.status(500).send('error posting: ', err.message);
  }
}

//clear the database
async function bombTheBase(req, res) {
  try {
    await Event.deleteMany({});
    console.log('Database cleared')
      ;
    res.status(200).send('cleared');
  }
  catch (e) {
    console.log('error:', e.message);
  }
}

async function deleteEvent(req, res) {
  let id = req.params.id;
  try {
    let deletedEvent = await Event.findByIdAndDelete(id);
    console.log(id);
    res.status(200).send(deletedEvent);
  }
  catch (e) {
    res.status(500).send(`Your Event was not deleted in server: ${e.message}`);
  }
}

async function putEvent(req, res) {
  let putObj = req.body;
  let id = req.params.id;
  try {
    let updateEvent = await Event.findByIdAndUpdate(id, putObj, { new: true, overwrite: true });
    console.log(updateEvent);
    res.status(200).send(updateEvent);
  }
  catch (e) {
    res.status(500).send(`Your Event was not updated in server: ${e.message}`);
  }
}



function sample(request, response) {
  const seed = [
    {
      summary: 'Test',
      location: 'The test area',
      description: 'This is a test',
      occupado: 20,
      start: {
        dateTime: '01/01/22',
        timeZone: '01/01/22',
      },
      end: {
        dateTime: '01/01/22',
        timeZone: '01/01/22',
      },
      colorId: '1',
    }
  ];
  seed.forEach(event => {
    let entry = new Event(event);
    entry.save();
    console.log(entry);
  });
  response.status(200).send('Seeded DB');

}


// const calendar = google.calendar({version: 'v3', auth: oAuth2Client});

// const eventStartTime = new Date();
// eventStartTime.setDate(eventStartTime.getDay() + 2);

// const eventEndTime = new Date();
// eventEndTime.setDate(eventEndTime.getDay() + 2);
// eventEndTime.setMinutes(eventEndTime.getMinutes() + 45);

// const event = {
//   summary: 'Meating with dave',
//   location: '177 Northwood Lane, Palmyra, NE 68418',
//   description: 'meeting with dave to talk about news',
//   start: {
//     dateTime: eventStartTime,
//     timeZone: 'America/Chicago',
//   },
//   end:{
//     dateTime: eventEndTime,
//     timeZone: 'America/Chicago',
//   },
//   colorId: 1,
// };

// calendar.freebusy.query({
//   resource:{
//     timeMin: eventStartTime,
//     timeMax: eventEndTime,
//     timeZone: 'America/Chicago', //google js timezone
//     items: [{id: 'primary'}],
//   }
// }, (err, res) => {
//   if(err) return console.error('Free Busy Error', err);

//   const eventsArr = res.data.calendars.primary.busy;

//   if (eventsArr.length === 0) return calendar.events.insert(
//     {calendarId: 'primary', resource: event},
//     err => {
//       if (err) return console.error('Calendar Event creation error', err);

//       return console.log('Calendar evnet created', event);
//     }
//   );
//   return console.log(`Sorry I'm busy`);
// });


// Route Setups
// Get/Put/Post/Delete Routes

// Seed Array if Any - maybe an enter tasks here? or tester?

// Functions:
// Get Tasks(inc.Auth) / post tasks / delete tasks / put tasks

