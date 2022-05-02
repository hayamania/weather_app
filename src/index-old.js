let weather = {
  paris: {
    temp: 19.7,
    humidity: 80,
  },
  tokyo: {
    temp: 17.3,
    humidity: 50,
  },
  lisbon: {
    temp: 30.2,
    humidity: 20,
  },
  "san francisco": {
    temp: 20.9,
    humidity: 100,
  },
  moscow: {
    temp: -5,
    humidity: 20,
  },
};

// write your code here
let searchCity = prompt("Please enter a city");
let ismatched = false;
if (searchCity.length > 0) {
  searchCity = searchCity.trim();
}

// Converting celsius to Fehrenheit
function cToF(celsius) {
  return Math.round((celsius * 9) / 5 + 32);
}

//Check the input data is not null
if (searchCity.length > 0) {
  searchCity = searchCity.toLowerCase();
  //Check the input city is matched the weather object
  for (const property in weather) {
    if (searchCity === property) {
      ismatched = true;
      break;
    }
  }

  //Choose aleart message
  if (ismatched === true) {
    //Caoitalize the first letter of the city
    const resultCity = searchCity.split();
    for (let i = 0; i < resultCity.length; i++) {
      resultCity[i] =
        resultCity[i][0].toUpperCase() + resultCity[i].substring(1);
    }
    resultCity.join();

    alert(
      `It is currently ${Math.round(weather[searchCity].temp)}°C(${cToF(
        weather[searchCity].temp
      )}°F) in ${resultCity} with a humidity of ${
        weather[searchCity].humidity
      }%`
    );
  } else {
    alert(
      `Sorry, we don't know the weather for this city, try going to https://www.google.com/search?q=weather+${searchCity}`
    );
  }
} else {
  alert("Please enter a city");
}
