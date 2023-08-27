const weatherApi = {
    key: "07c1a91f11b612566dd36e65a0eb2c19",
    url: "https://api.openweathermap.org/data/2.5/weather",
}



const searchInputBox = document.getElementById('input-box');
searchInputBox.addEventListener('keypress', (event) => {

    if (event.key == 'Enter') {
        // console.log(searchInputBox.value);
        getWeatherReport(searchInputBox.value);
    }
}); 

// For Getting Weather Report
function getWeatherReport(city) {
    fetch(`${weatherApi.url}?q=${city}&appid=${weatherApi.key}&units=metric`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(showWeatherReport)
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
            alert('City not found. Please enter a valid city name.');
        });

}

//For Showing Weather Report
function showWeatherReport(weather) {
    console.log(weather);

    

    let city = document.getElementById('city');
    city.innerText = `${weather.name}, ${weather.sys.country}`;

    let temperatureElement = document.getElementById('temprature');
    temperatureElement.innerHTML = `${weather.main.temp}°C`;

    let minMaxElement = document.getElementById('ratio');
    minMaxElement.innerText = `${weather.main.temp_min}°C (min) / ${weather.main.temp_max}°C (max)`;

    let weatherSituationElement = document.getElementById('weather-situation');
    weatherSituationElement.innerText = weather.weather[0].main;

    let weatherType = weather.weather[0].main;
    let backgroundImage = document.querySelector('img');

    let date = document.getElementById("time");
    let currentDate = new Date();
    date.innerText = dateView(currentDate);

    if (weather.cod === '404') {
        // Display an error message for invalid city
        alert('City not found. Please enter a valid city name.');
        return;
    }

    if (weather.weather[0].main == "Clouds") {
        backgroundImage.src = "image/cloudysky.jpg";
    }
    else if (weather.weather[0].main == "Rain") {
        backgroundImage.src = "image/rainysky.jpg";

    }
    else if(weather.weather[0].main == "Clear") {
        backgroundImage.src = "image/clearsky.jpg";
    }
    else if(weather.weather[0].main == "Sunny"){
        backgroundImage.src = "image/sunnysky.jpg";
    }
    else if(weather.weather[0].main == "Thunderstorm"){
        backgroundImage.src = "image/thunderstromsky.jpg";
    }
    else if(weather.weather[0].main == "Haze"){
        backgroundImage.src = "image/hazesky.jpg";
    }
    else if(weather.weather[0].main == "Mist"){
        backgroundImage.src = "image/mistsky.jpg";
    }
    else {
        backgroundImage.src = "image/originalbgimg.jpg";
    }


}



function dateView(dateArgument) {

    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    let year = dateArgument.getFullYear();
    let month = months[dateArgument.getMonth()];
    let date = dateArgument.getDate();
    let day = days[dateArgument.getDay()];

    return `${date} ${month}(${day}),${year}`;

}



// api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}