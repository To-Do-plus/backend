'use strict';

const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  summary: { type: String },
  location: { type: String },
  description: { type: String },
  occupado: { type: Number },
  start: {
    dateTime: { type: String },
    timeZone: { type: String },
  },
  end: {
    dateTime: { type: String },
    timeZone: { type: String },
  },
  colorId: { type: String },
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;





