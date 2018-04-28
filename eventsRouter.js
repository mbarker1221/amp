'use strict';
/*jshint esversion: 6 */
/*jshint node: true */
var EVENT_URL="http://api.eventful.com/json/events/search?app_key=c7nd5jGWK8tkcThz&category=music&l=";
const express = require('express');
const app = express();
const router = express.Router();

const eventsRouter = express.Router();

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const morgan = require('morgan');

app.get('/events', (req, res) => {
  Event
    .find()
    .then(events => {
      res.json(events.map(event => event.serialize()))
  })
    .catch(err => {
      console.error(err);
      .next();
      res.status(500).json({error: 'error'});
    });
});

var eventTemplate = (
  '<div class="event-results-page">' +
  '<ul class = "even">'+
    '<li class="event_title"> </li><span id ="title"></span>' +
    '<li class="city_name"> </li><span id ="city_name"></span>' +
    '<li class="start_time"> </li><span id ="start_time"></span>' +
    '<li class="venue_name> </li><span id ="venue_name"></span>' +
    '<li class="description"> </li><span id ="description"></span>' +
    '</ul>' +
    '</div>'
    );
    
app.get('/events', (req, res) => {
  Event
    .find()
    .then(events => {
      res.json(events.map(event => event.serialize()))
  })
    .catch(err => {
      console.error(err);
      next();
      res.status(500).json({error: 'error'});
    });
});

var eventTemplate = (
  '<div class="event-results-page">' +
  '<ul class = "even">'+
    '<li class="event-title"> </li><span id ="title"></span>' +
    '<li class="city_name"> </li><span id ="city_name"></span>' +
    '<li class="start_time"> </li><span id ="start_time"></span>' +
    '<li class="venue_name> </li><span id ="venue_name"></span>' +
    '<li class="description"> </li><span id ="description"></span>' +
    '</ul>' +
    '</div>'
    );

function showEvents(results) {

  const {title} = results.events.event.title;
 var {city_name} = results.events.event.city_name;
  const {start_time} = results.events.event.start_time; 
  const {description} = results.events.event.description;
  const {venue_name} = results.events.event.venue_name;
  const {artist_name} = results.events.event.artist_name;
  const {image} = results.events.event.image.small.url;
  };

  showEvents();


module.exports = {router};
