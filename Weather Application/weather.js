const apiKey = "c37d6c13dbabd92b120d524976d0838a";
const city = new URLSearchParams(window.location.search).get("city");

if (!city) {
  document.getElementById("city-name").textContent = "No city provided.";
} else {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
  )
    .then((response) => response.json())
    .then((data) => {
      document.getElementById("city-name").textContent = data.name;

      document.getElementById("temperature").textContent = data.main.temp;

      const condition = data.weather[0].main.toLowerCase();
      const videoElement = document.getElementById("condition-video");
      const conditionTextElement = document.getElementById("condition-text");

      const conditionMap = {
        brokenclouds: "Broken clouds.mp4",
        clear: "Clear.mp4",
        coldwave: "Cold Wave.mp4",
        cyclone: "Cyclone.mp4",
        drizzle: "Drizzle.mp4",
        dust: "Dust.mp4",
        fair: "Fair.mp4",
        flashflood: "Flash Flood.mp4",
        fog: "Fog.mp4",
        freezingrain: "Freezing rain.mp4",
        frostbitconditions: "Frostbite Conditions.mp4",
        hail: "hail.mp4",
        heatwave: "heatwave.mp4",
        heavysnow: "Heavy snow.mp4",
        hot: "Hot.mp4",
        hurricanewarning: "Hurricane Warning.mp4",
        hurricane: "Hurricane.mp4",
        ice: "Ice.mp4",
        lightsnow: "Light snow.mp4",
        mild: "Mild.mp4",
        overcast: "Overcast.mp4",
        partlycloudy: "Partly Cloudy.mp4",
        rain: "Rain.mp4",
        rainbow: "Rainbow.mp4",
        rainstorm: "Rainstorm.mp4",
        sandstorm: "Sandstorm.mp4",
        severethunderstorm: "Severe Thunderstorm.mp4",
        sleet: "Sleet.mp4",
        smoke: "Smoke.mp4",
        snowshowers: "Snow showers.mp4",
        snowstorm: "snowstorm.mp4",
        strongwinds: "Strong winds.mp4",
        sunny: "sunny.mp4",
        thunderstorm: "Thunderstorm.mp4",
        tornadowarning: "Tornado Warning.mp4",
        tornado: "Tornado.mp4",
        warm: "Warm.mp4",
        windy: "Windy.mp4",
        mostlyclear: "Clear.mp4",
        mostlycloduy: "Cloudy.mp4",
        muggy: "Fiar.mp4",
        humid: "Mild.mp4",
        dew: "Mild.mp4",
        dry: "Warm",
        scorching: "Hot.mp4",
        scatteredclouds: "Broken clouds.mp4",
        lightrain: "Rain.mp4",
        heavyrain: "Rain.mp4",
        showers: "Drizzle.mp4",
        blowingsnow: "Snow showers.mp4",
        frost: "Ice.mp4",
        flurries: "Hail.mp4",
        blizzard: "Snowstorm.mp4",
        breezy: "Windy.mp4",
        cool: "Cold.mp4",
        gale: "Strong winds.mp4",
        chilly: "Cold.mp4",
        mist: "Fog.mp4",
        patchyfog: "Fog.mp4",
        densefog: "Fog.mp4",
        haze: "Fog.mp4",
        freezing: "Freezing rain.mp4",
        lighting: "Thunderstorm.mp4",
      };

      if (conditionMap[condition]) {
        videoElement.querySelector("source").src = conditionMap[condition];
        videoElement.classList.remove("hidden");
        videoElement.load();
        videoElement.play();
        conditionTextElement.textContent = data.weather[0].description;
      } else {
        conditionTextElement.textContent =
          "No video available for this condition.";
      }

      document.getElementById("feels-like").textContent = data.main.feels_like;
      document.getElementById("humidity").textContent = data.main.humidity;
      document.getElementById("pressure").textContent = data.main.pressure;
      document.getElementById("clouds").textContent = data.clouds.all;
      document.getElementById("wind-speed").textContent = data.wind.speed;
      document.getElementById("wind-direction").textContent = data.wind.deg;

      fetch(
        `https://api.openweathermap.org/data/2.5/air_pollution?lat=${data.coord.lat}&lon=${data.coord.lon}&appid=${apiKey}`
      )
        .then((response) => response.json())
        .then((aqiData) => {
          const aqi = aqiData.list[0].main.aqi;
          const aqiText =
            aqi === 1
              ? "Good"
              : aqi === 2
              ? "Fair"
              : aqi === 3
              ? "Moderate"
              : aqi === 4
              ? "Poor"
              : "Very Poor";
          document.getElementById("aqi").textContent = `${aqiText}`;
        })
        .catch((error) => {
          document.getElementById("aqi").textContent = "Error fetching AQI.";
        });
    })
    .catch((error) => {
      console.error("Error fetching weather data:", error);
      document.getElementById("city-name").textContent =
        "Could not fetch weather data.";
    });
}
