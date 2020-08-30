'use strict'
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000
app.listen(PORT , ()=>{
    console.log(`You are listening to port ${PORT}`)
})

app.get('/location',( request , respond) =>{
    const geoData = require('./data/geo.json');
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
    res.send(locationData);
})
function Location(cityData) {
    this.search_query = cityData;
    this.formatted_query=geoData[0].display_name;
    this.latitude=geoData[0].lat;
    this.longitude=geoData[0].lon;
}