// Get current date and time
function getDateAndTime(dateandtime) {
  let now = new Date(dateandtime * 1000);
  let currentDate = now.getDate();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let currentDay = days[now.getDay()];
  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let currentMonth = months[now.getMonth()];
  let currentHour = String(now.getHours()).padStart(2, "0");
  let currentTime = String(now.getMinutes()).padStart(2, "0");
  let nowDateSentene = `${currentDay} ${currentDate} ${currentMonth}   ${currentHour}:${currentTime}`;
  let nowDate = document.querySelector("#currentDate");
  let lastUpdate = document.querySelector("#lastUpdate");
  nowDate.innerHTML = nowDateSentene;
  lastUpdate.innerHTML = `Last update: ${nowDateSentene}`;
}
// Converting Celsius to Fahrenheit
function cToF(celsius) {
  return Math.round((celsius * 9) / 5 + 32);
}

// Converting Fahrenheit to Celsius
function FtoC(fahrenheit) {
  return Math.round(((fahrenheit - 32) * 5) / 9);
}

// Changing background image and condition icon
function changeBackimageIcon(condi) {
  let changeBackgound = document.getElementById("card");
  let changeIcon = document.getElementById("currentIcon");

  // Changing background image
  if (condi < 300) {
    //thunderstorm
    changeBackgound.style.backgroundImage = "url(./images/02thunderstorm.jpg)";
    changeIcon.src = "./images/thunder.svg";
  } else if (condi < 600) {
    // drizzle or rain
    changeBackgound.style.backgroundImage = "url(./images/03rain.jpg)";
    changeIcon.src = "./images/rainy-7.svg";
    console.log("rain" + changeBackgound);
  } else if (condi < 700) {
    // snow
    changeBackgound.style.backgroundImage = "url(./images/06snow.jpg)";
    changeIcon.src = "./images/snowy-6.svg";
  } else if (condi < 800) {
    // mist/fog/dust...etc
    changeBackgound.style.backgroundImage = "url(./images/07mist.jpg)";
  } else if (condi === 800) {
    // clear
    changeBackgound.style.backgroundImage = "url(./images/08sunny.jpg)";
    changeIcon.src = "./images/day.svg";
  } else {
    // clouds
    changeBackgound.style.backgroundImage = "url(./images/08clouds.jpg)";
    changeIcon.src = "./images/cloudy.svg";
  }
}

// Show weather info in searched city
function showWeatherOfCity(response) {
  let temp = Math.round(response.data.main.temp);
  let temp_max = `${Math.round(response.data.main.temp_max)}º`;
  let temp_min = `${Math.round(response.data.main.temp_min)}º`;
  let feelsLike = `Feels like ${Math.round(response.data.main.feels_like)}º`;
  let datenTime = response.data.dt;
  let condition = response.data.weather[0].main;
  let conditionID = response.data.weather[0].id;
  let humidity = `Humidity: ${response.data.main.humidity}%`;
  let wind = `Wind: ${Math.round(response.data.wind.speed)} km/h`;
  let currentTemp = document.querySelector("#temp-now");
  let tempMax = document.querySelector("#tempMax");
  let tempMin = document.querySelector("#tempMin");
  let currentCondi = document.querySelector("#currenCondi");
  let showCity = document.querySelector("#searchLocation");
  let feels = document.querySelector("#feels-like");
  let detailHumidity = document.querySelector("#detailHumidity");
  let windSpeed = document.querySelector("#windSpeed");

  currentTemp.innerHTML = temp;
  tempMax.innerHTML = temp_max;
  tempMin.innerHTML = temp_min;
  currentCondi.innerHTML = condition;
  showCity.innerHTML = response.data.name;
  feels.innerHTML = feelsLike;
  detailHumidity.innerHTML = humidity;
  windSpeed.innerHTML = wind;

  // Show date ant time
  getDateAndTime(datenTime);

  // Change background image and icon
  changeBackimageIcon(conditionID);
}
// Get weather at searched city from API
function getWeather(city) {
  let apiKey = "a5819625e2717720981216aa54bee886";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showWeatherOfCity);
}

// Show input-city
function switchCity(event) {
  event.preventDefault();
  //Search engine
  let searchCityForm = document.querySelector("#input-city");
  let searchCity = searchCityForm.value;

  // Check the input data is not null
  if (searchCity.length > 0) {
    searchCity = searchCity.trim();

    //Capitalize the first letter of the city
    const resultCity = searchCity.split(" ");
    for (let i = 0; i < resultCity.length; i++) {
      resultCity[i] =
        resultCity[i][0].toUpperCase() + resultCity[i].substring(1);
    }
    searchCity = resultCity.join(" ");

    //Chenge the city from defalt
    // showCity.innerHTML = searchCity;

    //Get weather info from API
    getWeather(searchCity);
  } else {
    // alert("Please input a city");
  }
}

// Show fahrenheit tempreture
function showFTemp(event) {
  event.preventDefault();
  let TempNow = document.querySelector("#temp-now");
  TempNow.innerHTML = cToF(21);
}

// Show Celsius tempreture
function showCTemp(event) {
  event.preventDefault();
  let TempNow = document.querySelector("#temp-now");
  TempNow.innerHTML = FtoC(70);
}

// Seach current location
function clickLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showLocation);
}
// Show weather info in current location
function showTemperature(weather) {
  console.log(weather);

  let temp = Math.round(weather.data.main.temp);
  let temp_max = `${Math.round(weather.data.main.temp_max)}º`;
  let temp_min = `${Math.round(weather.data.main.temp_min)}º`;
  let condition = weather.data.weather[0].main;
  let conditionID = weather.data.weather[0].id;
  let cityName = weather.data.name;
  let currentTemp = document.querySelector("#temp-now");
  let tempMax = document.querySelector("#tempMax");
  let tempMin = document.querySelector("#tempMin");
  let currentCondi = document.querySelector("#currenCondi");
  let searchLocation = document.querySelector("#searchLocation");

  currentTemp.innerHTML = temp;
  tempMax.innerHTML = temp_max;
  tempMin.innerHTML = temp_min;
  currentCondi.innerHTML = condition;
  searchLocation.innerHTML = cityName;

  // Change background image and icon
  changeBackimageIcon(conditionID);
}
// Show current location
function showLocation(response) {
  let latitude = response.coords.latitude;
  let longititude = response.coords.longitude;

  // Get weather info in current location
  let apiKey = "a5819625e2717720981216aa54bee886";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longititude}&units=${units}&appid=`;
  axios.get(apiUrl + apiKey).then(showTemperature);
}

let searchCityButton = document.querySelector("#searchForm");
searchCityButton.addEventListener("submit", switchCity);

let switchFahrenheit = document.querySelector("#temp-fahrenheit");
switchFahrenheit.addEventListener("click", showFTemp);

let switchCelsius = document.querySelector("#temp-celsius");
switchCelsius.addEventListener("click", showCTemp);

let getCurrentLocation = document.querySelector("#searchCurrentLocation");
getCurrentLocation.addEventListener("click", clickLocation);

// Show weather info at default city
getWeather("London");
