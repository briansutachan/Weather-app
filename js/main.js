//weather API endpoint
const api_root = 'http://api.openweathermap.org/data/2.5/weather?zip='

// API key
var api_key = `67ec1886aa4e6bccb306862098c6301d`

// select element from the DOM
var city_name = document.querySelector(`#city_name`)
var zip = document.querySelector(`.searchBox`)
var weather = document.querySelector(`.weather`)
var temp = document.querySelector(`.temp`)
var humid = document.querySelector(`.humid`)
var convert = document.querySelector(`.convert`)
var icon = document.querySelector(`#iconBox`)

var temper  
var state = true

function kelvinToFahrenheit(kelvin){
    return Math.round(kelvin * (9/5) - 459.67)
}

function fahrenheitToCelsius(faren){
    return Math.round((faren - 32) * 5/9)
}
function addIcon(w){
    console.log(w)
    if(w == "Cloudy"){
        icon.src = `img/cloudy.png`
    }
    if(w == "Clouds"){
        icon.src = `img/cloudy.png`
    }
    if(w == "Partly-cloudy"){
        icon.src = `img/partly-cloudy.png`
    }
    if(w == "Rain"){
        icon.src = `img/rain.png`
    }
    if(w == "Snow"){
        icon.src = `img/snow.png`
    }
    if(w == "Sun"){
        icon.src = `img/sun.png`
    }
    if(w == "Thunderstrorm"){
        icon.src = `img/thunderstorm.png`          
    }
    if(w == "Clear"){
        icon.src = `img/sunny.png`
    }
}

function getWeather(zipCode){
    $.ajax({
        type:`GET`,
        url: `${api_root}${zipCode},us&appid=${api_key}`,
        dataType: `json`,
        success: function(data){
            console.log(data)
            temper = kelvinToFahrenheit(data.main.temp)
            console.log(data.weather[0].main)
            weather.textContent = data.weather[0].main
            city_name.textContent = data.name
            temp.innerHTML = `${temper} &deg F;`
            humid.textContent = `${data.main.humidity}%`
        },
        error: function(data){
            console.log(error)
        }

    })
}

getWeather(`33166`)

zip.addEventListener(`keypress`, function(e){
    if(e.keyCode == 13){
        getWeather(this.value)
    }
})
convert.addEventListener(`click`, function(e){
// console.log(fahrenheitToCelsius(temper))
if(state == true){
    temp.innerHTML = `${fahrenheitToCelsius(temper)} &deg C`
    state = false
} else {
    temp.innerHTML =`${temper} &deg F`
    state = true
}
})

