// Node Selections
const timeDisplay = document.querySelector("#displayTime");
const form = document.querySelector("#searchForm");
const userSearch = document.querySelector("#searchInput");
const temperature = document.querySelector("#temp");
const windDisplay = document.querySelector("#wind");
const realFeelDisplay = document.querySelector("#realFeel");
const humidityDisplay = document.querySelector("#humidity");
const currentcity = document.querySelector("#city");
const errorCity = document.querySelector("#cityerror");
const weatherIcon = document.querySelector("#weatherIcon");
const weatherDescription = document.querySelector("#weatherDescription");
const forecastContainer = document.querySelector(".forecastContainer");

// Fetch Weather From Backend (SECURED KEY)
async function fetchWeather(city) {
  try {
    const res = await fetch(`/api/weather?city=${city}`);
    const data = await res.json();

    if (data.cod == "404") {
      showError();
      return;
    }

    updateUI(data);
  } catch (err) {
    showError();
  }
}


// Update UI with fetched data
function updateUI(data) {
  errorCity.style.display = "none";

  temperature.textContent = Math.round(data.main.temp) + "°C";
  windDisplay.textContent = "Wind Speed : " + data.wind.speed + " km/h";
  realFeelDisplay.textContent = "Real Feel : " + data.main.feels_like + "°C";
  humidityDisplay.textContent = "Humidity : " + data.main.humidity + " %";
  weatherDescription.textContent = data.weather[0].description;
  weatherDescription.style.display = "block";

  // icon
  const iconCode = data.weather[0].icon;
  weatherIcon.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
  weatherIcon.style.display = "block";

  // city
  currentcity.textContent = data.name;

  // Hide old forecast (no 5-day forecast from this endpoint)
  forecastContainer.style.display = "none";
}

// Error UI
function showError() {
  temperature.textContent = "--";
  windDisplay.textContent = "--";
  realFeelDisplay.textContent = "--";
  humidityDisplay.textContent = "--";

  weatherIcon.style.display = "none";
  weatherDescription.style.display = "none";

  errorCity.style.display = "block";
  setTimeout(() => (errorCity.style.display = "none"), 2500);
}

// Form Handler
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const city = userSearch.value.trim();

  if (!city) return;

  fetchWeather(city);

  currentcity.textContent =
    city.charAt(0).toUpperCase() + city.slice(1).toLowerCase();

  userSearch.value = "";
});

// Digital Clock
function showTime() {
  let now = new Date();
  let h = now.getHours();
  let m = now.getMinutes();
  let s = now.getSeconds();

  timeDisplay.textContent = 
    `${h.toString().padStart(2,"0")}:${m.toString().padStart(2,"0")}:${s.toString().padStart(2,"0")}`;
}

showTime();
setInterval(showTime, 1000);
