var dotEnv = require("dotenv").config();
var keys = require('./keys.js');
var twitter = require('twitter');
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var request = require('request');
var fs = require('fs');
var client = new twitter(keys.twitter);

var commandNames = process.argv.filter((value,index) => index > 2).reduce((a, b) => {return a + " " + b},"");
var command = process.argv[2];


switch(command) {
 case "my-tweets":
        tweetHistory();
        break;
 case "spotify-this-song":
        showSongs();
        break;
 case "movie-this":
        showMovie();
        break;
  default:
        console.log("{Please enter a command: my-tweets, spotify-this-song, movie-this, do-what-it-says}");
      break;
}


function tweetHistory(){
 var params = {screen_name: 'MwebbMerritt'};
client.get('statuses/user_timeline', params, function(error, tweets, response) {
 if (!error) {
 tweets.forEach(element => console.log(`Tweet-Message: ${element.text} \nDate Create: ${element.created_at}`));
            };
        });
};


function showSongs(){
spotify.search({ type: 'track', query: commandNames }, function(err, data) {
  if (!err) {
     

 var dataAcc = data.tracks.items;
 var dataAvail = dataAcc.forEach(e => console.log(element) )
          
 }
});
};


function showMovie(){
    var queryUrl = `http://www.omdbapi.com/?t=${commandNames}&y=&plot=short&apikey=trilogy`;

request(queryUrl,function(error,response,body){

if(!error && response.statusCode === 200){

        var parsing = JSON.parse(body);
                console.log(`Title: ${parsing.Title} \nYear: ${parsing.Released}`);

                var accessRatings = (parsing.Ratings).filter((item,index) => index < 2 )
                accessRatings.forEach(element => {console.log(`${element.Source} Rating: ${element.Value}`)});

        console.log(`Country: ${parsing.Country} \nLanguage: ${parsing.Language} \nPlot: ${parsing.Plot} \nActors: ${parsing.Actors}`)

    };
 })
};

