async function getWeatherData(city) {
  const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=metric&key=Y83HG5UXWFLK66Z83CL2TYMYY&contentType=json`;

  const displayWeather = document.querySelector(".weather");
  const displayError = document.querySelector(".error");

  const response = await fetch(url);

  if (response.status === 400) {
    displayError.style.display = "block";
    displayWeather.style.display = "none";
    return;
  }

  const data = await response.json();

  displayError.style.display = "none";
  displayWeather.style.display = "block";

  console.log(data);

  document.querySelector(".city").innerHTML = data.address;
  document.querySelector(".temp").innerHTML =
    data.currentConditions.temp + "°C";
  document.querySelector(".humidity").innerHTML =
    data.currentConditions.humidity + "%";
  document.querySelector(".wind").innerHTML =
    data.currentConditions.windspeed + " km/h";
  const weatherIcon = document.querySelector(".weather-icon");

  const weatherCondition = data.currentConditions.conditions;

  if (weatherCondition.includes("Overcast")) {
    weatherIcon.src = "static/images/clouds.png";
  } else if (weatherCondition.includes("rain")) {
    weatherIcon.src = "static/images/rain.png";
  } else if (weatherCondition.includes("clear")) {
    weatherIcon.src = "static/images/clear.png";
  } else if (weatherCondition.includes("snow")) {
    weatherIcon.src = "static/images/snow.png";
  } else {
    weatherIcon.src = "static/images/mist.png";
  }
}

const searchBtn = document.querySelector(".search button");
const searchInput = document.querySelector(".search input");

searchBtn.addEventListener("click", () => {
  const city = searchInput.value;
  getWeatherData(city);
});
