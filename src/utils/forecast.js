const request = require('request')
const forecast = (latitude, longitude, callback) => {
    const url = 
    'https://api.darksky.net/forecast/e441617cae7eaa09b38d416ad53b4834/'
        + latitude + ',' + longitude + '?units=si'
    request({url: url, json: true}, (error, response) => {
        if (error) {
            callback('Unable to connect to forecast services!', undefined)
        } else {
            //console.log('------------Response ------------')
            //console.log(response.body)
            //console.log('------------Minutely ------------')
            //console.log(response.body.minutely.data[0])
            //console.log('------------Hourly ------------')
            //console.log(response.body.hourly.data[0])
            //console.log('------------Daily ------------')
            //console.log(response.body.daily.data[0])            
            let info = response.body.daily.data[0].summary + ' It is currently ' +
            response.body.currently.temperature + ' degrees out. There is a ' +
            response.body.currently.precipProbability + '% chance of rain.'
            
            var sevenDay = []
            response.body.daily.data.forEach( (eachDay) => {
                sevenDay.push({
                    summary: eachDay.summary,
                    tempHigh: eachDay.temperatureHigh,
                    tempLow: eachDay.temperatureLow,
                    rain: eachDay.precipProbability * 100,
                    humidity: eachDay.humidity * 100
                })
            });

            callback(undefined, info, sevenDay)
        }
    })
}

module.exports = forecast