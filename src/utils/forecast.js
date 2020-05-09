const request = require('request')
const forecast = (latitude, longitude, callback) => {
    const url = 
    'https://api.darksky.net/forecast/e441617cae7eaa09b38d416ad53b4834/'
        + latitude + ',' + longitude + '?units=si'
    request({url: url, json: true}, (error, response) => {
        if (error) {
            callback('Unable to connect to forecast services!', undefined)
        } else {
            let info = response.body.daily.data[0].summary + ' It is currently ' +
            response.body.currently.temperature + ' degrees out. There is a ' +
            response.body.currently.precipProbability + '% chance of rain.'
            callback(undefined, info)
        }
    })
}

module.exports = forecast