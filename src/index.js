function displayForecast(response) {
  let cityElement = document.querySelector("#city-element");
  let countryElement = document.querySelector("#country-element");
  let tempElement = document.querySelector("#temp-element");
  let feelsLikeElement = document.querySelector("#feels-like");
  let humidityElement = document.querySelector("#humidity");
  let windSpeedElement = document.querySelector("#wind-speed");
  cityElement.innerHTML = response.data.name;
  countryElement.innerHTML = response.data.sys.country;
  tempElement.innerHTML = Math.round(response.data.main.temp);
  feelsLikeElement.innerHTML = Math.round(response.data.main.feels_like);
  humidityElement.innerHTML = response.data.main.humidity;
  windSpeedElement.innerHTML = response.data.wind.speed;
}
let city = "London";
let apiKey = "120813c35ed58ddba478b72f03dd1a3e";
let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

axios.get(apiURL).then(displayForecast);
