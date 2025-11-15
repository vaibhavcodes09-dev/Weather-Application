// Nodes Selection
const timeDisplay = document.querySelector("#displayTime");
const form = document.querySelector("form");
const userSearch = document.querySelector("input");
const temperature = document.querySelector("#temp");
const windDisplay = document.querySelector("#wind");
const realFeelDisplay = document.querySelector("#realFeel");
const humidityDisplay = document.querySelector("#humidity");
const currentcity = document.querySelector("#city");
const errorCity = document.querySelector("#cityerror");
const weatherIcon = document.querySelector("#weatherIcon");
const weatherDescription = document.querySelector("#weatherDescription");
const forecastContainer = document.querySelector(".forecastContainer");

// Fetching Weather/API Call
async function fetchWeather(city) {
  const API_key = "dc05ba167267cff2ad7f80b7367e285f";
  const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_key}&units=metric`;
  try {
    let response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error("City not Found / Error Loading");
    }
    let data = await response.json();
    errorCity.style.display = "none";
    // Updating DOM
    temperature.textContent = Math.round(data.list[0].main.temp) + "°C";
    windDisplay.textContent =
      "Wind Speed : " + data.list[0].wind.speed + " km/h";
    realFeelDisplay.textContent =
      "Real Feel : " + data.list[0].main.feels_like + "°C";
    humidityDisplay.textContent =
      "Humidity : " + data.list[0].main.humidity + " %";
    weatherDescription.textContent = data.list[0].weather[0].description;
    weatherDescription.style.display = "block";

    // 5 Days forecast cards
    forecastContainer.innerHTML = ""; // clear previous data
    const forecastDays = [0, 8, 16, 24, 32];
    forecastDays.forEach((index) => {
      const info = data.list[index];
      const date = new Date(info.dt_txt);
      const formattedDate = `${date.getDate()}/${date.getMonth() + 1}`;
      const temp = Math.round(info.main.temp);
      const minTemp = Math.round(info.main.temp_min);
      const maxTemp = Math.round(info.main.temp_max);
      const humidity = info.main.humidity;
      const icon = info.weather[0].icon;
      const desc = info.weather[0].description;

      // Create card
      const card = document.createElement("div");
      card.classList.add("forecastCard");

      card.innerHTML = `
    <p class="date">${formattedDate}</p>
    <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="${desc}" />
    <h3 class="temp">${temp}°C</h3>
    <p class="range">⬆️ ${maxTemp}°C | ⬇️ ${minTemp}°C</p>
    <p class="humidity">💧 ${humidity}%</p>
  `;

      forecastContainer.appendChild(card);
    });
    forecastContainer.style.display = "flex";

    // For getting and updating icon
    weatherIcon.style.display = "block";
    const iconCode = data.list[0].weather[0].icon;
    const imageUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
    weatherIcon.src = imageUrl;
  } catch (error) {
    console.error(error.message);
    temperature.textContent = "--";
    windDisplay.textContent = "--";
    realFeelDisplay.textContent = "--";
    humidityDisplay.textContent = "--";
    errorCity.style.display = "block";
    forecastContainer.style.display = "none";
    weatherIcon.style.display = "none";
    weatherDescription.style.display = "none";
    setTimeout(() => (errorCity.style.display = "none"), 3000);
  }
}
// Handling form & input
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  let city = userSearch.value.trim();
  let formattedCityName =
    city.charAt(0).toUpperCase() + city.slice(1).toLowerCase();
  if (city) {
    fetchWeather(city);
    currentcity.textContent = formattedCityName;
    userSearch.value = "";
  } else return;
});

// Function for getting and updating time
function showTime() {
  // Getting time
  let now = new Date();
  let hour = now.getHours();
  let minute = now.getMinutes();
  let seconds = now.getSeconds();

  // Handling addition of 0 in time is in single digit
  let hourStr = hour < 10 ? "0" + hour : hour;
  let minuteStr = minute < 10 ? "0" + minute : minute;
  let secondsStr = seconds < 10 ? "0" + seconds : seconds;

  // Upating and printing time
  let time = `${hourStr}:${minuteStr}:${secondsStr}`;
  timeDisplay.textContent = time;
}
showTime();
setInterval(showTime, 1000);
