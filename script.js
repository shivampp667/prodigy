const apiKey = "f469ae35eafe861fc462644aa5f88381"; 

function getWeather() {
  const city = document.getElementById("cityInput").value;
  if (!city) return alert("Please enter a city name");
  fetchWeatherData(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
}

function getLocationWeather() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      fetchWeatherData(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`);
    });
  } else {
    alert("Geolocation is not supported by your browser.");
  }
}

function fetchWeatherData(url) {
  fetch(url)
    .then((res) => res.json())
    .then((data) => showWeather(data))
    .catch(() => {
      document.getElementById("weatherResult").innerHTML = `<p>❌ Could not fetch weather data.</p>`;
    });
}

function showWeather(data) {
  if (data.cod !== 200) {
    document.getElementById("weatherResult").innerHTML = `<p>❌ ${data.message}</p>`;
    return;
  }

  const html = `
    <h2>${data.name}, ${data.sys.country}</h2>
    <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" />
    <p><strong>${data.weather[0].description}</strong></p>
    <p>🌡 Temp: ${data.main.temp}°C</p>
    <p>💧 Humidity: ${data.main.humidity}%</p>
    <p>💨 Wind: ${data.wind.speed} m/s</p>
  `;
  document.getElementById("weatherResult").innerHTML = html;
}
