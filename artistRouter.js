'use strict';
/*jshint esversion: 6 */
/*jshint node: true */

const ARTIST_URL = "http://api.eventful.com/json/performers/search?app_key=c7nd5jGWK8tkcThz&keywords=";
const express = require('express');
const router = express.Router();
const ARTIST_URL = require('./config');
const artistRouter = express.Router();

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

//const {Events} = require('./models');
const morgan = require('morgan');

var request = require("request");

var options = {method: 'GET',
  url: 'http://api.songkick.com/api/3.0/search/artists.json',
  qs: {apikey: 'ovLum2i3CCGRjtHA', 
  query: '{artist_name}'},
  headers: 
   {'Cache-Control': 'no-cache',
     ovLum2i3CCGRjtHA: 'basic'} };

request(options, function (error, response, body) {
  if (error) throw new Error(error);
});

const aTemplate = 

'<div class = "artist_display">' +
'<ul class = "artists">' +
'<li class="name">Artist: </li> <span id="name"></span>' +
        '<li class="shows">Shows: </li><span id="shows"></span>' + 
        '<li class="tourEnds">On Tour Until: </li><span id="tourEnds"></span>' +
        '</ul>' +
        '</div>'  


 var artistTemplate = (
  '<ul class = "ART">'
    '<li class="name">Artist: </li>' +
    '<span id="name"></span>' +
    '<li class="tourEnds">On Tour Until: </li>' +
    '<span id="tourEnds"></span>' 
  )

function setUpArt() {
  let name = results.artist.displayName;
  $(`.name`).text(name);
  let shows = results.artist.identifier.eventsHref;
  $(`.shows`).text(shows);
  let website = results.artist.identifier.href;
  $(`.website`).text(website);
  let tourEnds = results.artist.onTourUntil;
  $(`.tourEnds`).text(tourEnds);

}

router.get('/', (req, res) => {
  res.json(Artist.get())
});

function getAndDisplayArtist() {
  console.log('Retrieving artist');
  $.getJSON(ARTIST_URL, function(artist) {
    console.log('Rendering artist');
    var artistTemplate = items.map(function(item) {
      var element = $(artistTemplate);
  
      var artistName = element.find('.name');
      artistName.text(artist.name);
    });

    $('.artist_results_page').html(itemElement);
  });
}

module.exports = {router} ;

