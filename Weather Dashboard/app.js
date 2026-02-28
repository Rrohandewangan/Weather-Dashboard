const apiKey = "615a076404f823929b08676e38214442" ;

const cityInput = document.querySelector("#city-input") ;
const SearchBtn = document.querySelector("#btn") ;
const weatherCard = document.querySelector(".weather-card") ;
const errorMsg = document.querySelector("#error-msg") ;

const cityName = document.querySelector("#city-name") ;
const dateTime = document.querySelector("#date-time") ;
const iconElement = document.querySelector("#weather-icon") ;
const temperature = document.querySelector("#temperature") ;
const humidity = document.querySelector("#humidity") ;
const windSpeed = document.querySelector("#wind-speed") ;


function updateUI(data) {
    
    // cityname
    cityName.innerText = data.name ;

    // date and time
    const now = new Date() ;
    dateTime.innerText = now.toDateString() + " | " + now.toLocaleTimeString() ;

    // weather icon
    const iconCode = data.weather[0].icon ;
    iconElement.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

    //temperature
    temperature.innerText = `${Math.round(data.main.temp)}°C` ;

    //humidity 
    humidity.innerText = `💧 ${data.main.humidity}%` ;

    //windSpeed
    windSpeed.innerText = `🌬 ${data.wind.speed} km/h` ;

    // show weather card & hide error
    weatherCard.style.display = "block" ;
    errorMsg.style.display = "none" ;
}


async function getWeather(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url) ;

        if(!response.ok) {
            throw new Error("city not found") ;
        }

        let data = await response.json() ;
        console.log(data) ;
        updateUI(data) ;
        errorMsg.style.display = "none" ;

    } catch(error) {
        errorMsg.style.display = "block" ;
        weatherCard.style.display = "none" ;
    }
} ;

SearchBtn.addEventListener("click", () => {
    console.log("button clicked") ;
    let city = cityInput.value.trim() ;

    if(city === "") {
        errorMsg.style.display = "block" ;
        errorMsg.innerText = "❌ Enter the city name!" ;
        return ;
    }
    getWeather(city) ;

})