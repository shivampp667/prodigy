let [hours, minutes, seconds] = [0, 0, 0];
let display = document.getElementById("display");
let interval = null;
let isRunning = false;

function updateDisplay() {
  let h = hours < 10 ? "0" + hours : hours;
  let m = minutes < 10 ? "0" + minutes : minutes;
  let s = seconds < 10 ? "0" + seconds : seconds;
  display.textContent = `${h}:${m}:${s}`;
}

function timer() {
  seconds++;
  if (seconds === 60) {
    seconds = 0;
    minutes++;
  }
  if (minutes === 60) {
    minutes = 0;
    hours++;
  }
  updateDisplay();
}

function startStop() {
  if (!isRunning) {
    interval = setInterval(timer, 1000);
    isRunning = true;
    document.querySelector("button").textContent = "Pause";
  } else {
    clearInterval(interval);
    isRunning = false;
    document.querySelector("button").textContent = "Start";
  }
}

function reset() {
  clearInterval(interval);
  [hours, minutes, seconds] = [0, 0, 0];
  updateDisplay();
  isRunning = false;
  document.querySelector("button").textContent = "Start";
  document.getElementById("laps").innerHTML = "";
}

function recordLap() {
  if (isRunning) {
    const lapTime = display.textContent;
    const li = document.createElement("li");
    li.textContent = `Lap - ${lapTime}`;
    document.getElementById("laps").appendChild(li);
  }
}
