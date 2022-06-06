function toAddZero(number) {
  number < 10 ? (number = `0${number}`) : number;
  return number;
}

function showDate() {
  let date = new Date();
  let arrayOfDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  let day = arrayOfDays[date.getDay()];
  let hours = toAddZero(date.getHours());
  let minutes = toAddZero(date.getMinutes());

  return ` ${day}, ${hours}:${minutes}`;
}

let time = document.querySelector(".currentTime");
time.innerText = showDate();

// adding weather Api and coords

function setWeather(lat, long, city) {
  let apiKey = `47acee420b645368c8f4f5042bbda62e`;
  let apiUrl = ``;

  if (lat && long && !city) {
    apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}&units=metric`;
  } else if (!lat && !long && city) {
    apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  }

  function toSetApiWeather(respond) {
    console.log(respond.data.wind.speed);
    let cityPlace = document.querySelector("h1");
    let city = respond.data.name;
    let conditionPlace = document.querySelector(".condition");
    let condition = respond.data.weather[0].main;

    let temperaturePlace = document.querySelector(".mainTempToChange");
    let temperature = Math.floor(respond.data.main.temp);

    let humPlace = document.querySelector(".hum");
    let hum = respond.data.main.humidity;
    let windPlace = document.querySelector(".wind");
    let wind = Math.round(respond.data.wind.speed * 3.6);

    cityPlace.innerText = `${city}`;
    conditionPlace.innerText = `${condition}`;
    temperaturePlace.innerText = `${temperature}`;
    humPlace.innerText = `Humidity: ${hum} %`;
    windPlace.innerText = `Wind: ${wind} km/h`;
  }

  axios.get(apiUrl).then(toSetApiWeather);
}

function getCurrentLocation(e) {
  e.preventDefault();
  function showMyLocation(location) {
    let lat = location.coords.latitude;
    let long = location.coords.longitude;
    setWeather(lat, long);
  }

  navigator.geolocation.getCurrentPosition(showMyLocation);
}

let current = document.querySelector('input[value="current"]');
current.addEventListener("click", getCurrentLocation);

function toDo(e) {
  e.preventDefault();
  let searchCity = document.querySelector("input[type='text']").value;
  setWeather(null, null, searchCity);
}

let form = document.querySelector("form");
form.addEventListener("submit", toDo);
