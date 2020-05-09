// Query selector, for tagname direct use of it, for css class .classname, for id #id of element
const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#msg-1')
const messageTwo = document.querySelector('#msg-2')
const divW = document.querySelector('#div-w')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    
    const location = search.value
    
    // clear the messages
    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''
    divW.innerHTML = ''

    fetch('/weather?address='+location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error
            } else {
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecast
                //messageThree.textContent = JSON.stringify(data.sevenDay)
                let sevenDayTable = "<table><caption>Forecast for the  week</caption>" +
                    "<tr><th>Summary</th><th>Temperature</th><th>Rain</th><th>Humidity</th></tr>";
                data.sevenDay.forEach( (data) => {
                    sevenDayTable += "<tr><td>" + data.summary +
                        "</td><td>Low:&nbsp;" + data.tempLow +
                            "<br>High:&nbsp;" + data.tempHigh + 
                        "</td><td>" + data.rain.toFixed(2) + "%" +
                        "</td><td>" + data.humidity.toFixed(2) + "%" +
                        "</td></tr>"
                });
                sevenDayTable += "</table>"
                divW.innerHTML = sevenDayTable
            }
        })
    })

})