'use strict'
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000
app.use(cors());
const superAgent = require('superagent')

// Route defenetions 
app.get('/location', locationFunc);
app.get('/weather', weatherFunc);
app.get('/trails', trailsFunc);
app.use('*', notFoundFunc);
app.use(errorFunc);


// Route functions
function locationFunc(request, respond) {
    const cityData = request.query.city;
    console.log(cityData);
    getLocationFunc(cityData)
        .then(locationData => respond.status(200).json(locationData));
}

function getLocationFunc(cityData) {
    const locationKey = process.env.GEOCODE_API_KEY;
    const locationURL = `https://eu1.locationiq.com/v1/search.php?key=${locationKey}&q=${cityData}&format=json`

    return superAgent.get(locationURL)
        .then(data => {
            let locationData = new Location(cityData, data.body);
            return locationData;
            // respond.send(locationData);
        })


};

function weatherFunc(req, res) {
    let weatherArr = []
    const cityData = req.query.search_query;
    const lat = req.query.latitude;
    const long = req.query.longitude;
    const keyWeather = process.env.WEATHER_API_KEY;
    const weatherURL = `https://api.weatherbit.io/v2.0/forecast/daily?city=${cityData}&lat=${lat}&lon=${long}&key=${keyWeather}`;

    superAgent.get(weatherURL)
        .then(allData => {
            allData.body.data.map(element => {
                let forecast = element.weather.description;
                let time = element.datetime;
                weatherArr.push(new Weather(forecast, time))
            })
            res.send(weatherArr);
            // return weatherArr
        })
};

function trailsFunc(req, res) {
    let trailsArr = []
    // const cityData = req.query.search_query;
    const latTrail = req.query.latitude;
    const longTrail = req.query.longitude;
    const keyTrail = process.env.TRAIL_API_KEY;
    // const weatherURL = `https://api.weatherbit.io/v2.0/forecast/daily?city=${cityData}&lat=${latTrail}&lon=${longTrail}&key=${keyWeather}`;
    const trailsURL = `https://www.hikingproject.com/data/get-trails?lat=${latTrail}&lon=${longTrail}&key=${keyTrail}`

    superAgent.get(trailsURL)
        .then(allTrailsData => {
            allTrailsData.body.trails.map(element => {

                let name = element.name;
                let location = element.location;
                let length = element.length;
                let stars = element.stars;
                let star_votes = element.starvotes;
                let summary = element.summary;
                let trail_url = element.url;
                let conditions = element.conditionDetails;
                let condition_date = element.conditionDate;



                trailsArr.push(new Trailss(name, location, length, stars, star_votes, summary, trail_url, conditions, condition_date))
    })
            res.send(trailsArr);
            // return trailsArr
        })
};


function Location(cityData, geoData) {
    this.search_query = cityData;
    this.formatted_query = geoData[0].display_name;
    this.latitude = geoData[0].lat;
    this.longitude = geoData[0].lon;
}
function Weather(forecast, time) {
    this.forecast = forecast;
    this.time = time;
    // Weather.all.push(this);
    // weatherArr.push(this)
}

function Trailss(name, location, length, stars, star_votes, summary, trail_url, conditions, condition_date) {
   this.name = name;
   this.location = location;
   this.length = length;
   this.stars = stars;
   this.star_votes = star_votes;
   this.summary = summary;
   this.trail_url = trail_url;
   this.conditions = conditions;
   this.condition_date = condition_date;
}


function notFoundFunc(req, res) {
    res.status(404).send('NOT FOUND');
};

function errorFunc(error, req, res) {
    res.status(500).send(`Oops! There is a ${error} error`);
}
app.listen(PORT, () => {
    console.log(`You are listening to port ${PORT}`)
})