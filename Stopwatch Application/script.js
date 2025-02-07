function updateClock() {
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();

  const hourHand = document.querySelector(".hour-hand");
  const minuteHand = document.querySelector(".minute-hand");
  const secondHand = document.querySelector(".second-hand");

  const hourDeg = (hours % 12) * 30 + minutes * 0.5;
  const minuteDeg = minutes * 6;
  const secondDeg = seconds * 6;

  hourHand.style.transform = `rotate(${hourDeg}deg)`;
  minuteHand.style.transform = `rotate(${minuteDeg}deg)`;
  secondHand.style.transform = `rotate(${secondDeg}deg)`;
}

setInterval(updateClock, 1000);
updateClock();

function updateDateTime() {
  const now = new Date();
  document.getElementById("date").textContent = now.toDateString();
  document.getElementById("time").textContent = now.toLocaleTimeString();
}

setInterval(updateDateTime, 1000);
updateDateTime();

let stopwatchTimer = null;
let stopwatchSeconds = 0;
const timerDisplay = document.querySelector(".stopwatch-timer");
const startButton = document.getElementById("startButton");
const stopButton = document.getElementById("stopButton");

function updateStopwatchDisplay() {
  const hrs = String(Math.floor(stopwatchSeconds / 3600)).padStart(2, "0");
  const mins = String(Math.floor((stopwatchSeconds % 3600) / 60)).padStart(
    2,
    "0"
  );
  const secs = String(stopwatchSeconds % 60).padStart(2, "0");
  timerDisplay.textContent = `${hrs}:${mins}:${secs}`;
}

function startStopwatch() {
  if (!stopwatchTimer) {
    stopwatchTimer = setInterval(() => {
      stopwatchSeconds++;
      updateStopwatchDisplay();
    }, 1000);
    startButton.textContent = "RESUME";
  }
}

function stopStopwatch() {
  clearInterval(stopwatchTimer);
  stopwatchTimer = null;
  startButton.textContent = "START";
}

function resetStopwatch() {
  clearInterval(stopwatchTimer);
  stopwatchTimer = null;
  stopwatchSeconds = 0;
  updateStopwatchDisplay();
  startButton.textContent = "START";
}

startButton.addEventListener("click", startStopwatch);
stopButton.addEventListener("click", stopStopwatch);
document
  .getElementById("resetButton")
  .addEventListener("click", resetStopwatch);

const lapList = document.getElementById("lapList");

function lapTime() {
  const lapTime = document.querySelector(".stopwatch-timer").innerText;
  const lapItem = document.createElement("div");
  lapItem.classList.add("lap-item");
  lapItem.innerText = `Lap: ${lapTime}`;
  lapList.appendChild(lapItem);
}

document.getElementById("lapButton").addEventListener("click", lapTime);

let zoneTimer;

function startZoneTimer(seconds) {
  clearInterval(zoneTimer);
  document.querySelector(".zone-timer-display").innerText = formatTime(seconds);

  zoneTimer = setInterval(() => {
    if (seconds > 0) {
      seconds--;
      document.querySelector(".zone-timer-display").innerText =
        formatTime(seconds);
    } else {
      clearInterval(zoneTimer);
      alert("Time is up!");
    }
  }, 1000);
}

function formatTime(seconds) {
  let hours = Math.floor(seconds / 3600);
  let minutes = Math.floor((seconds % 3600) / 60);
  seconds = seconds % 60;
  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

function pad(num) {
  return num < 10 ? "0" + num : num;
}

document.querySelectorAll(".zone-timer-button").forEach((button) => {
  button.addEventListener("click", (e) => {
    const seconds = parseInt(e.target.getAttribute("data-time"));
    startZoneTimer(seconds);
  });
});

let customTimerInterval;
let customTimerSeconds = 0;

function startCustomTimer() {
  const hours = parseInt(document.getElementById("hours").value) || 0;
  const minutes = parseInt(document.getElementById("minutes").value) || 0;
  const seconds = parseInt(document.getElementById("seconds").value) || 0;
  customTimerSeconds = hours * 3600 + minutes * 60 + seconds;

  customTimerInterval = setInterval(() => {
    if (customTimerSeconds > 0) {
      customTimerSeconds--;
      document.querySelector(".timer-display").innerText =
        formatTime(customTimerSeconds);
    } else {
      clearInterval(customTimerInterval);
      alert("Custom timer is up!");
    }
  }, 1000);
}

function stopCustomTimer() {
  clearInterval(customTimerInterval);
}

function resetCustomTimer() {
  clearInterval(customTimerInterval);
  document.querySelector(".timer-display").innerText = "00:00:00";
  document.getElementById("hours").value = "";
  document.getElementById("minutes").value = "";
  document.getElementById("seconds").value = "";
}

function formatTime(seconds) {
  let hours = Math.floor(seconds / 3600);
  let minutes = Math.floor((seconds % 3600) / 60);
  seconds = seconds % 60;
  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

function pad(num) {
  return num < 10 ? "0" + num : num;
}
