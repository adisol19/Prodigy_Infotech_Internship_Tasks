function searchWeather() {
  const city = document.getElementById("city").value;
  if (city) {
    window.location.href = `weather.html?city=${encodeURIComponent(city)}`;
  } else {
    alert("Please enter a city.");
  }
}
