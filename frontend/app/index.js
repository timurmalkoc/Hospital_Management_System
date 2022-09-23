const PORT = 8000
require('cross-fetch/polyfill');
const express = require('express')
const cors = require('cors');
const { response } = require('express');
require('dotenv').config()

const app = express()
app.use(cors())
app.use(express.json());

// Weather API ===========================

app.post('/weather', async (req, res) => {
    const city = req.body.city
    const zipCode = req.body.zip_code

    const info = await getWeatherInfo(city, zipCode)
    res.send(info)

})

const getWeatherInfo = (async (city, zipCode) =>{
    const weather_API = process.env.weather_API
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city},${zipCode}&appid=${weather_API}&units=imperial`);
    if(response.status >= 400)
        return {"error":"error occured"}
    else
        return response.json()

})

app.listen(PORT, () => console.log(`Server is running on ${PORT}`))