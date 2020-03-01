require("dotenv").config();
var Spotify = require("node-spotify-api");
var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);
var action = process.argv[2];
var value = process.argv[3];
var axios = require("axios");
var fs = require("fs")

// We will then create a switch-case statement (if-else would also work).
// The switch-case will direct which function gets run.
switch (action) {
case "concert-this":
concertThis(value);
  break;

case "spotify-this-song":
spotifyThisSong(value);
  break;

case "movie-this":
movieThis(value);
  break;

case "do-what-it-says":
doWhatItSays();
  break;
}

function concertThis(value){
// Then run a request with axios to the OMDB API with the movie specified
var queryUrl = "https://rest.bandsintown.com/artists/" + value + "/events?app_id=codingbootcamp";

// This line is just to help us debug against the actual URL.
console.log(queryUrl);

axios.get(queryUrl).then(
  function(response) {
    console.log(response.data);
  })
  .catch(function(error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log("---------------Data---------------");
      console.log(error.response.data);
      console.log("---------------Status---------------");
      console.log(error.response.status);
      console.log("---------------Status---------------");
      console.log(error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an object that comes back with details pertaining to the error that occurred.
      console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log("Error", error.message);
    }
    console.log(error.config);
  });
}
  function spotifyThisSong(value){
    spotify.search({ type: 'track', query: value}, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }
      console.log(data.track); 
      });
  }
function movieThis(value){
    var queryUrl = "http://www.omdbapi.com/?t=" + value + "&y=&plot=short&apikey=trilogy";
// This line is just to help us debug against the actual URL.
console.log(queryUrl);
axios.get(queryUrl).then(
  function(response) {
    console.log(response.data);
  })
  .catch(function(error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log("---------------Data---------------");
      console.log(error.response.data);
      console.log("---------------Status---------------");
      console.log(error.response.status);
      console.log("---------------Status---------------");
      console.log(error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an object that comes back with details pertaining to the error that occurred.
      console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log("Error", error.message);
    }
    console.log(error.config);
  });
}

function doWhatItSays(){
    fs.readFile("random.txt", "utf8", function(err, data) {
        if (err) {
          return console.log(err);
        }
        console.log(data);
});

}
