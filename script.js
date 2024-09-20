let hrs = document.getElementById("hrs");
let min = document.getElementById("min");
let sec = document.getElementById("sec");
let ampm = document.getElementById("ampm");
let timezoneSelect = document.getElementById("timezone");
let toggleThemeBtn = document.getElementById("toggle-theme");
let body = document.body;

let alarmTime = null;
let isAlarmSet = false;
let alarmStatus = document.getElementById("alarm-status");
let alarmSound = new Audio("https://www.soundjay.com/button/beep-07.wav"); // Sample alarm sound

function updateClock() {
  let currentTime = new Date();
  let timezone = timezoneSelect.value;

  // Convert to selected timezone
  if (timezone === "UTC") {
    currentTime = new Date(currentTime.toUTCString());
  } else if (timezone === "EST") {
    currentTime = new Date(
      currentTime.toLocaleString("en-US", { timeZone: "America/New_York" })
    );
  } else if (timezone === "PST") {
    currentTime = new Date(
      currentTime.toLocaleString("en-US", { timeZone: "America/Los_Angeles" })
    );
  }

  let hours = currentTime.getHours();
  let minutes = currentTime.getMinutes();
  let seconds = currentTime.getSeconds();

  let period = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12;

  hrs.innerHTML = (hours < 10 ? "0" : "") + hours;
  min.innerHTML = (minutes < 10 ? "0" : "") + minutes;
  sec.innerHTML = (seconds < 10 ? "0" : "") + seconds;
  ampm.innerHTML = period;

  // Check for alarm
  if (isAlarmSet && alarmTime === `${hours}:${minutes} ${period}`) {
    alarmSound.play();
    alarmStatus.innerHTML = "Alarm ringing!";
    isAlarmSet = false;
  }
}

setInterval(updateClock, 1000);
updateClock();

// Toggle Light/Dark Mode
toggleThemeBtn.addEventListener("click", () => {
  body.classList.toggle("light-mode");
});

// Set Alarm
document.getElementById("set-alarm").addEventListener("click", () => {
  let alarmInput = document.getElementById("alarm-time").value;
  if (alarmInput) {
    let [alarmHour, alarmMinute] = alarmInput.split(":");
    let period = parseInt(alarmHour) >= 12 ? "PM" : "AM";
    alarmHour = alarmHour % 12 || 12;
    alarmTime = `${alarmHour}:${alarmMinute} ${period}`;
    isAlarmSet = true;
    alarmStatus.innerHTML = `Alarm set for ${alarmTime}`;
  } else {
    alarmStatus.innerHTML = "Please set a valid time.";
  }
});
