function formatDate(timestamp) {
  let date = new Date(timestamp);
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${day} ${hours}:${minutes}`;
}

function displayWeather(response) {
  let cityElement = document.querySelector("#city-element");
  let countryElement = document.querySelector("#country-element");
  let tempElement = document.querySelector("#temp-element");
  let descriptionElement = document.querySelector("#description");
  let feelsLikeElement = document.querySelector("#feels-like");
  let humidityElement = document.querySelector("#humidity");
  let windSpeedElement = document.querySelector("#wind-speed");
  let dateElement = document.querySelector("#current-date");
  let iconElement = document.querySelector("#icon");

  cityElement.innerHTML = response.data.name;
  countryElement.innerHTML = response.data.sys.country;
  tempElement.innerHTML = `${Math.round(response.data.main.temp)}℃`;
  descriptionElement.innerHTML = response.data.weather[0].description;
  feelsLikeElement.innerHTML = `${Math.round(response.data.main.feels_like)}℃`;
  humidityElement.innerHTML = response.data.main.humidity;
  windSpeedElement.innerHTML = Math.round(response.data.wind.speed);
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  getForecastData(response.data.coord);
}

function getForecastData(coordinates) {
  let apiKey = "120813c35ed58ddba478b72f03dd1a3e";
  let apiURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiURL).then(displayForecast);
}
function formatForecastDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}
function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#projected-forecast");
  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `<ul class="col projected-forecast">
         <li>${formatForecastDay(forecastDay.dt)}</li>
         <li><img src="http://openweathermap.org/img/wn/${
           forecastDay.weather[0].icon
         }@2x.png" alt="" width="42"></li>
         <li>${Math.round(forecastDay.temp.max)}°</li>
        </ul>`;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function search(city) {
  let apiKey = "120813c35ed58ddba478b72f03dd1a3e";
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiURL).then(displayWeather);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
}

function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKeyGeo = "120813c35ed58ddba478b72f03dd1a3e";
  let apiURLGeo = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKeyGeo}&units=metric`;
  axios.get(apiURLGeo).then(displayWeather);
}

function getPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

let formElement = document.querySelector("#search-form");
formElement.addEventListener("submit", handleSubmit);

let currentLocationElement = document.querySelector("#current-location");
currentLocationElement.addEventListener("click", getPosition);
