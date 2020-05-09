const express = require('express')
const path = require('path')
const hbs = require('hbs')

const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')

const app = express()

// Define paths  for express config
const publicDir = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directoy to serve
app.use(express.static(publicDir))

console.log(publicDir)

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'provide a validation address'
        })
    } 
    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({error})
        } 
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            } 
               
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})

app.get('/products', (req, res) => {
    if(!req.query.search)  {
        return res.send({
            error: 'you must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About author',
        name: 'Mahesh'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helptext: 'This is basic help, we are building it.',
        title: 'Help Page',
        name: 'Mahesh'
    })
})

app.get('', (req, res) => {
    res.render('index', {
        title: 'My weather forecast',
        name: 'Mahesh'
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        text: 'Help article not found',
        title: 'Help Error',
        name: 'Mahesh'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        text: 'Page not found',
        title: '404',
        name: 'Mahesh'
    })
})
app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})