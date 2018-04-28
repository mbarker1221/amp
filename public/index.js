/*jshint esversion: 6 */
/*jshint node: true */

const serverBase = "http://localhost:8080";
const USER_URL = "./users";
var EVENT_URL="http://api.eventful.com/json/events/search?app_key=c7nd5jGWK8tkcThz&category=music&l=";
//const ARTIST_URL= "/artistRouter";
//const EVENT_URL = "./eventsRouter";
const ARTIST_LIST_URL = "http://api.eventful.com/json/performers/events/list?app_key=c7nd5jGWK8tkcThz&id=";
const ARTIST_URL = "http://api.eventful.com/json/performers/search?app_key=c7nd5jGWK8tkcThz&keywords=";
const ALL_URL = "http://api.eventful.com/json/events/search?app_key=c7nd5jGWK8tkcThz&keywords=music";
const searchSimilar = "http://api.songkick.com/api/3.0/artists/68043/similar_artists.json?apikey=ovLum2i3CCGRjtHA";
const events = "http://api.eventful.com/json/performers/events/list?app_key=c7nd5jGWK8tkcThz&id=P0-001-000034547-0";
const similar = "http://api.eventful.com/json/performers/get?c7nd5jGWK8tkcThz&id=P0-001-000000045-2";
// "http://api.eventful.com/json/events/search?app_key=c7nd5jGWK8tkcThz&category=music&l=";

function hideUnusedSections() {
  $("#landing_page").hide();
  $("#artist_results_page").hide();
  $("#event_results_page").hide();
  $("#sign_up_page").hide();
  $("#sign_in_page").hide();
  $("#profile_page").hide();
  $("#deletePage").hide();
}

function renderPage() {
   hideUnusedSections();
   $("#landing_page").show();
}

function toggleSignUp() {
 hideUnusedSections();
  $("#sign_up_page").show();
}

function toggleSignIn() {
  hideUnusedSections();
  $("#sign_in_page").show();
}

function toggleArtist() {
hideUnusedSections();
  $("#artist_results_page").show();
  getArtist();
}

function getArtist() {
  const artist_name = $("input[name=artistSearch]");
  const art = artist_name.val();

  var settings = {
    "async": true,
    "crossDomain": true,
    "dataType": "jsonp",
    "url": ARTIST_URL + art,
    "method": "GET",
    "headers": {
      "Cache-Control": "no-cache",
    }
  };
  
  $.ajax(settings).done(function(response) {
    showArtist(response);
  });
}

function showArtist(results) {
  $("#artistSearch").val('');
  let id = results.performers.performer[0].url;
  $("#id").text(id);
  let name = results.performers.performer[0].name;
  $("#name").text(name);
}

function toggleEvents() {
hideUnusedSections();
$(".event_results_page").show();
getEvents();
}

function getEvents() {
  var locate = $("input[name=eventSearch]");
  var loc = locate.val();
  var params = {
    "async": true,
    "crossDomain": true,
    "dataType": "jsonp",
    "url": EVENT_URL + loc,
    "method": "GET",
    "headers": {
      "Cache-Control": "no-cache"
    }
  };
  
  $.ajax(params).done(function(response) {
    showEvents(response);
  });
}

function showEvents(results) {
    $("#eventSearch").val('');
  var title = results.events.event[0].title;
  $(`#title`).text(title);
  var city = results.events.event[0].city_name;
  $(`#city_name`).text(city);
  var start_time = results.events.event[0].start_time;
  $(`#starts`).text(start_time);
  var venueE = results.events.event[0].venue_name;
  $(`#venueE`).text(venueE);
  var address = results.events.event[0].venue_address;
  $(`#address`).text(address);
 // var description = results.events.event[0].description;
  //$(`#description`).text(description);
//  var image = results.events.event[0].image.medium.url;
 // $(`#img`).text(image);
  var title2 = results.events.event[1].title;
  $(`#title2`).text(title);
  var city2 = results.events.event[1].city_name;
  $(`#city_name2`).text(city);
  var start_time2 = results.events.event[1].start_time;
  $(`#starts2`).text(start_time);
  var venueE2 = results.events.event[1].venue_name;
  $(`#venueE2`).text(venueE);
  var address2 = results.events.event[1].venue_address;
  $(`#address2`).text(address);

  var title3 = results.events.event[2].title;
  $(`#title3`).text(title);
  var city3 = results.events.event[2].city_name;
  $(`#city_name3`).text(city);
  var start_time3 = results.events.event[2].start_time;
  $(`#starts3`).text(start_time);
  var venueE3 = results.events.event[2].venue_name;
  $(`#venueE3`).text(venueE);
  var address3 = results.events.event[2].venue_address;
  $(`#address3`).text(address);
}


function toggleNewUser() {
hideUnusedSections();
$(".profile_page").show();
  handleNewUser();
}


function handleNewUser() {
  const uN = $("input[name=username]").val();
  const pW = $("input[name=password]").val();
  const eM = $("input[name=email]").val();
  postNewUser(uN, pW, eM);
}

function postNewUser(uN, pW, eM) {
  var settings = {
    "async": true,
    "crossDomain": true,
    "url": USER_URL,
    //"http://mongodb://mbarker1221:shompin1@ds131698.mlab.com:31698/users",
    //"http://mongodb://mbarker1221:shompin1@ds131698.mlab.com:31698/users",
    "method": "POST",
    "dataType": "jsonp",
    "headers": {
      "Content-Type": "application/json",
      "Cache-Control": "no-cache"
    },
    "processData": false,
    "data": {
      "username": uN,
      "password": pW,
      "email": eM
    }
  };
  $.ajax(settings).done(function (response) {
    //console.log(response);
    displayProfile(response);
  });
}

function displayProfile(response) {
hideUnusedSections();
  handleHello();
}
/*
  var currentUser = this.user.username;
  storeUser(response);
}

function storeUser(response) {
   var User = {
    id: this.id,
    username: this.username,
    password: this.password,
    email: this.email
    }
  
  var User = {
    id: this.User[user.id],
    username: this.User[user.username],
    password: this.password[user.password],
    email: this.User[user.email]
  };
  handleHello();
}
*/
function handleHello() {
  hideUnusedSections();
  $('#profile_page').show();
 var hello = ( `Hello, (${user.username}) !`);
}

function toggleOldUser() {
hideUnusedSections();
  $(".profile_page").show();
  handleOldUser();
}

function handleOldUser() {
  var usnm = $("input[name=un]").val();
  var pasw = $("input[name=pw]").val();
  clearValues();
}

function clearValues() {
  $("#userName").val('');
  $("#userPass").val('');
  getOldUser(usnm, pasw);
}

function getOldUser(usnm, pasw) {
  var settings = {
    "async": true,
    "crossDomain": true,
    "url": "http://mongodb://mbarker1221:shompin1@ds131698.mlab.com:31698/users",
    "method": "GET",
    "dataType": "jsonp",
    "headers": {
      "Content-Type": "application/json",
      "Cache-Control": "no-cache"
    },
    "processData": false,
    "data": {
      "username": usnm,
      "password": pasw
    }
  };
  $.ajax(settings).done(function (response) {
   //console.log(response);
    displayProfile(response);
  });
}

function displayProfile(response) {
  hideUnusedSections();
  $('#profile_page').show();
}
// handleHello();
//}


function updateUser() {
  let userId = this.User[user.id];
  let usern = $("input[name=updateUN]").val();
  let passw = $("input[name=updatePASS]").val();
  handleUpdate(userId, usern, passw);
}

function handleUpdate(userId, usern, passw) {

  $.ajax({
    method: "PUT",
    url: USER_URL + "/" + userId,
    dataType: "json",
    contentType: "application/json",
    data: {
      "username": usern,
      "password": passw
    },
    success: function (User) {
      console.log(response);
      storeUser();
    },
    error: function () {
      alert('Error!');
    }
  });
}

function deleteUser() {
  console.log("deleting user");
  var UserId = this.User[user.id];

  $.ajax({
    method: "DELETE",
    url: USER_URL + "/" + UserId,
    dataType: "jsonp",
    contentType: "application/json",

    success: function () {
      hideUnusedSections();
      $('.deletePage').show();
      alert("Success!");
    },

    error: function () {
      alert("Error!");
    }
  });
}

/*
$(document).ready();

window.onload = function () {
  hideUnusedSections();
  renderPage();
};
*/

$(() => {
  hideUnusedSections();
  renderPage();
})







