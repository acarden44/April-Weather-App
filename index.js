let apiKey = "3b34c40446ftcf4f07e329o00aa2e010";
let unit = "imperial"; // Default to Fahrenheit
let currentCity = "Grand Rapids"; // Default city

function displayTemperature(response) {
  let temperature = Math.round(response.data.temperature.current);
  let city = response.data.city;
  let icon = response.data.condition.icon_url;
  let humidity = response.data.temperature.humidity;
  let windSpeed = response.data.wind.speed;
  let windUnit = unit === "imperial" ? "mph" : "km/h";

  let cityElement = document.querySelector("#city-result");
  let temperatureElement = document.querySelector(".current-temperature-value");
  let iconElement = document.querySelector(".current-temperature-icon");
  let unitElement = document.querySelector(".current-temperature-unit");
  let humidityElement = document.querySelector(".humidity-value");
  let windElement = document.querySelector(".wind-speed-value");

  cityElement.innerHTML = city;
  temperatureElement.innerHTML = temperature;
  iconElement.innerHTML = `<img src="${icon}" alt="Weather icon">`;
  unitElement.innerHTML = unit === "imperial" ? "°F" : "°C";
  humidityElement.innerHTML = `${humidity}%`;
  windElement.innerHTML = `${windSpeed} ${windUnit}`;
}

function getWeather(city) {
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(displayTemperature);
}

// Handle search form submission
function search(event) {
  event.preventDefault();
  let searchInputElement = document.querySelector("#city-input");
  let city = searchInputElement.value.trim();

  if (city) {
    currentCity = city;
    getWeather(city);
  }
}

// Handle unit toggle
function toggleUnit() {
  unit = unit === "imperial" ? "metric" : "imperial";
  let toggleButton = document.querySelector("#unit-toggle");
  toggleButton.innerHTML =
    unit === "imperial" ? "Switch to °C" : "Switch to °F";

  // Refresh the weather data with the new unit
  getWeather(currentCity);
}

// Event Listeners
document.querySelector("#city-form").addEventListener("submit", search);
document.querySelector("#unit-toggle").addEventListener("click", toggleUnit);

// Load default weather data
getWeather(currentCity);
