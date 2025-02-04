function displayTemperature(response) {
  let temperature = Math.round(response.data.temperature.current);
  let city = response.data.city;
  let icon = response.data.condition.icon_url;
  let humidity = response.data.temperature.humidity;
  let windSpeed = response.data.wind.speed;

  // Detect unit from API request
  let unit = response.config.url.includes("imperial") ? "°F" : "°C";

  let cityElement = document.querySelector("#city-result");
  let temperatureElement = document.querySelector(".current-temperature-value");
  let iconElement = document.querySelector(".current-temperature-icon");
  let unitElement = document.querySelector(".current-temperature-unit");
  let humidityElement = document.querySelector(".humidity-value");
  let windElement = document.querySelector(".wind-speed-value");

  cityElement.innerHTML = city;
  temperatureElement.innerHTML = temperature;
  iconElement.innerHTML = `<img src="${icon}" alt="Weather icon">`;
  unitElement.innerHTML = unit;
  humidityElement.innerHTML = `${humidity}%`;
  windElement.innerHTML = `${windSpeed} km/h`;
}

function getWeather(city) {
  let apiKey = "3b34c40446ftcf4f07e329o00aa2e010";
  let unit = "imperial"; // Default to Fahrenheit

  // Auto-switch to metric for non-U.S. cities
  let usCities = [
    "New York",
    "Los Angeles",
    "Chicago",
    "Houston",
    "Grand Rapids",
  ];
  if (!usCities.includes(city)) {
    unit = "metric";
  }

  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(displayTemperature);
}

function search(event) {
  event.preventDefault();
  let searchInputElement = document.querySelector("#city-input");
  let city = searchInputElement.value.trim();

  if (city) {
    getWeather(city);
  }
}

// Event listener for search form
let searchForm = document.querySelector("#city-form");
if (searchForm) {
  searchForm.addEventListener("submit", search);
} else {
  console.error("Error: #city-form not found in the document.");
}

// Only load Grand Rapids if there's no previous search
if (!localStorage.getItem("lastCity")) {
  getWeather("Grand Rapids");
} else {
  getWeather(localStorage.getItem("lastCity"));
}
