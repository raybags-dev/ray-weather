const path = require('path');
const hbs = require('hbs');
const chalk = require('chalk');
const express = require('express');
const geocode = require('../src/utils/geocode');
const forecast = require('../src/utils/forecast');

const app = express();

const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');


app.set('view engine', 'hbs');
app.set('views', viewsPath);

app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    res.render('home', {
        title: 'Weather',
        name: 'Raymond_Baguma'
    })
});


app.get('/weather', (req, res) => {

    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        });
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error: error })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error: error })
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })


})

const port = process.env.PORT || 3000;
app.listen(port, () => { console.log(`Server listening on port: ${port}...`) })