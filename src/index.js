//let now = new Date();
//let current = document.querySelector("#select-date");
//let hours = now.getHours();
//let minutes = now.getMinutes();

//let days = [
//"Sunday",
//"Monday",
//"Tuesday",
//"wednesday",
//"Thursday",
//"Friday",
//"Saturday"
//];
//let day = days[now.getDay()];
//current.innerHTML = `${day} ${hours}:${minutes}`;

//challenge2

//function search(event) {
//event.preventDefault();
//let searchPlace = document.querySelector("#searchCity");

//let h1 = document.querySelector("h1");
//if (searchPlace.value) {
//h1.innerHTML = `${searchPlace.value}`;
//}
//}
//let form = document.querySelector("#search-form");
//form.addEventListener("submit", search);

//week5
function formatDate(date) {
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let dayIndex = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let day = days[dayIndex];

  return `${day} ${hours}:${minutes}`;
}

function displayWeatherCondition(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
}

function searchCity(city) {
  let apiKey = "d281dbd9dae29f7c6625a0ea7e548a7d";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}

function searchLocation(position) {
  let apiKey = "d281dbd9dae29f7c6625a0ea7e548a7d";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayWeatherCondition);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let dateElement = document.querySelector("#date");
let currentTime = new Date();
dateElement.innerHTML = formatDate(currentTime);

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

searchCity("London");
