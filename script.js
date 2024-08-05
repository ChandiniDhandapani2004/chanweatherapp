const apiKey = "f644463bf634164c0cdb37d4352d0b15";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");
const moodTitle = document.querySelector(".mood-title");
const moodMessage = document.querySelector(".mood-message");

async function checkWeather(city) {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

    if (response.status == 404) {
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    } else {
        const data = await response.json();

        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = data.main.temp + "°C";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + "km/hr";

        const uvIndex = Math.random() * 15;
        const tanIndex = uvIndex > 8 ? "Extreme" : uvIndex > 5 ? "High" : "Moderate";

        document.querySelector(".uv").innerHTML = uvIndex.toFixed(2);
        document.querySelector(".tan").innerHTML = tanIndex;

        if (data.weather[0].main == "Clouds") {
            weatherIcon.src = "images/clouds.png";
            moodTitle.innerHTML = "Today's Mood:";
            moodMessage.innerHTML = "It’s cloudy; maybe stay in and read a book.";
        } else if (data.weather[0].main == "Clear") {
            weatherIcon.src = "images/clear.png";
            moodTitle.innerHTML = "Today's Mood:";
            moodMessage.innerHTML = "It's a clear day; perfect for a walk outside!";
        } else if (data.weather[0].main == "Rain") {
            weatherIcon.src = "images/rain.png";
            moodTitle.innerHTML = "Today's Mood:";
            moodMessage.innerHTML = "It's rainy; cozy up with a hot drink!";
        } else if (data.weather[0].main == "Drizzle") {
            weatherIcon.src = "images/drizzle.png";
            moodTitle.innerHTML = "Today's Mood:";
            moodMessage.innerHTML = "It’s drizzling; a good day for a light jacket.";
        } else if (data.weather[0].main == "Mist") {
            weatherIcon.src = "images/mist.png";
            moodTitle.innerHTML = "Today's Mood:";
            moodMessage.innerHTML = "It's misty; perfect for a quiet day indoors.";
        }

        document.querySelector(".error").style.display = "none";
        document.querySelector(".weather").style.display = "block";
    }
}

// Hide weather info on page load
document.addEventListener("DOMContentLoaded", () => {
    document.querySelector(".weather").style.display = "none";
    document.querySelector(".error").style.display = "none";
});

searchBtn.addEventListener("click", () => {
    const city = searchBox.value.trim();
    if (city) {
        checkWeather(city);
    } else {
        document.querySelector(".error").textContent = "Please enter a city name!";
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    }
});
