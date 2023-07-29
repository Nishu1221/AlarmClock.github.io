let alarmIntervalId;

function setAlarm() {
  const alarmTimeInput = document.getElementById('alarmTime');
  const alarmTime = alarmTimeInput.value;
   alert("alarmset");

  if (!isValidTime(alarmTime)) {
    alert("Invalid time format! Please use HH:mm.");
    return;
  }

  const now = new Date();
  const alarmDateTime = new Date(now.toDateString() + ' ' + alarmTime);
  const timeDifference = alarmDateTime - now;

  if (timeDifference < 0) {
    alert("Please choose a time in the future.");
    return;
  }

  // Start the alarm interval
  alarmIntervalId = setInterval(updateTimer, 1000, alarmDateTime);
  alarmTimeInput.disabled = true;
}

function updateTimer(alarmDateTime) {
  const now = new Date();
  const timeDifference = alarmDateTime - now;

  if (timeDifference <= 0) {
    playAlarm();
    stopAlarm();
  } else {
    displayTimeLeft(timeDifference);
  }
}

function playAlarm() {
  const alarmSound = document.getElementById('alarmSound');
  alarmSound.play();
  alert("Alarm! Wake up!");
}

function stopAlarm() {
  clearInterval(alarmIntervalId);
  const alarmTimeInput = document.getElementById('alarmTime');
  alarmTimeInput.disabled = false;
}

function isValidTime(time) {
  const pattern = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
  return pattern.test(time);
}

function displayTimeLeft(milliseconds) {
  const seconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  const timerDisplay = document.getElementById('timer');
  timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
}