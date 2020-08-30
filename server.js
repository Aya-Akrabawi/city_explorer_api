'use strict'
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000
app.use(cors());


app.get('/location',( request , respond) =>{
    const geoData = require('./data/location.json');
    console.log(geoData);
    const cityData = request.query.city;
    console.log(cityData);
    // {
    //     "search_query": "seattle",
    //     "formatted_query": "Seattle, WA, USA",
    //     "latitude": "47.606210",
    //     "longitude": "-122.332071"
    //   }
    let locationData = new Location(cityData,geoData);
    respond.send(locationData);
})
function Location(cityData,geoData) {
    this.search_query = cityData;
    this.formatted_query=geoData[0].display_name;
    this.latitude=geoData[0].lat;
    this.longitude=geoData[0].lon;
}

app.get('/weather',( req , res) =>{
    // let weatherArr = []
    const cityData = req.query.city;
    const weatherInfo = require('./data/weather.json');
    console.log(weatherInfo);
    let weatherArr = [];
    weatherInfo.data.forEach(element => {
    let forecast = element.weather.description;
    let time = element.datetime;
    weatherArr.push(new Weather (forecast,time))
})
res.send(weatherArr);
});

function Weather(forecast,time) {
    this.forecast = forecast;
    this.time=time;
    // Weather.all.push(this);
    // weatherArr.push(this)
}
app.use('*',(req,res)=>{
    res.status(404).send('NOT FOUND');
})

app.use((error,req,res)=>{
    res.status(500).send(`Oops! There is a ${error} error`);
})
app.listen(PORT , ()=>{
    console.log(`You are listening to port ${PORT}`)
})