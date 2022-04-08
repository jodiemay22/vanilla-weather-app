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

function displayForecast(response) {
  console.log(response);
  let cityElement = document.querySelector("#city-element");
  let countryElement = document.querySelector("#country-element");
  let tempElement = document.querySelector("#temp-element");
  let descriptionElement = document.querySelector("#description");
  let feelsLikeElement = document.querySelector("#feels-like");
  let humidityElement = document.querySelector("#humidity");
  let windSpeedElement = document.querySelector("#wind-speed");
  let dateElement = document.querySelector("#current-date");
  let iconElement = document.querySelector("#icon");

  celciusTemp = response.data.main.temp;
  celciusFeelsLike = response.data.main.feels_like;

  cityElement.innerHTML = response.data.name;
  countryElement.innerHTML = response.data.sys.country;
  tempElement.innerHTML = `${Math.round(response.data.main.temp)}°`;
  descriptionElement.innerHTML = response.data.weather[0].description;
  feelsLikeElement.innerHTML = `${Math.round(response.data.main.feels_like)}℃`;
  humidityElement.innerHTML = response.data.main.humidity;
  windSpeedElement.innerHTML = Math.round(response.data.wind.speed);
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
}

function displayProjectedForecast() {
  let projectedForecastElement = document.querySelector("#projected-forecast");
  let days = ["Mon", "Tues", "Wed", "Thurs", "Fri"];
  let projectedForecastHTML = `<div class="row">`;
  days.forEach(function (day) {
    projectedForecastHTML =
      projectedForecastHTML +
      `<ul class="col projected-forecast">
         <li>${day}</li>
         <li>🌞</li>
         <li>17</li>
        </ul>`;
  });
  projectedForecastHTML = projectedForecastHTML + `</div>`;
  projectedForecastElement.innerHTML = projectedForecastHTML;
}

function search(city) {
  let apiKey = "120813c35ed58ddba478b72f03dd1a3e";
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiURL).then(displayForecast);
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
  axios.get(apiURLGeo).then(displayForecast);
}

function getPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

function displayFarenheitTemp(event) {
  event.preventDefault();
  let tempElement = document.querySelector("#temp-element");
  let feelsLikeElement = document.querySelector("#feels-like");
  tempElement.innerHTML = Math.round((celciusTemp * 9) / 5 + 32);
  feelsLikeElement.innerHTML = `${Math.round(
    (celciusFeelsLike * 9) / 5 + 32
  )} ℉`;
}

function displayCelciusTemp(event) {
  event.preventDefault();
  let tempElement = document.querySelector("#temp-element");
  let feelsLikeElement = document.querySelector("#feels-like");
  tempElement.innerHTML = Math.round(celciusTemp);
  feelsLikeElement.innerHTML = `${Math.round(celciusFeelsLike)}℃`;
}

displayProjectedForecast();

let celciusTemp = null;
let celciusFeelsLike = null;

let formElement = document.querySelector("#search-form");
formElement.addEventListener("submit", handleSubmit);

let currentLocationElement = document.querySelector("#current-location");
currentLocationElement.addEventListener("click", getPosition);

let farenheitElement = document.querySelector("#farenheit");
farenheitElement.addEventListener("click", displayFarenheitTemp);

let celciusElement = document.querySelector("#celcius");
celciusElement.addEventListener("click", displayCelciusTemp);
