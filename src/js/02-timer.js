import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

const datetimePicker = document.getElementById('datetime-picker');
const startBtn = document.querySelector('[data-start]');
const timerDays = document.querySelector('[data-days]');
const timerHours = document.querySelector('[data-hours]');
const timerMinutes = document.querySelector('[data-minutes]');
const timerSeconds = document.querySelector('[data-seconds]');

let dateId;

function countdown() {
  const selectedDate = new Date(datetimePicker.value).getTime();
  const currentDate = new Date().getTime();
  const difference = selectedDate - currentDate;

  if (difference <= 0) {
    Notiflix.Notify.failure('Please choose a date in the future.');
    return;
  }

  startBtn.disabled = true;

  dateId = setInterval(() => {
    const remainingTime = convertMs(selectedDate - new Date().getTime());
    renderTimer(remainingTime);

    if (
      remainingTime.days === 0 &&
      remainingTime.hours === 0 &&
      remainingTime.minutes === 0 &&
      remainingTime.seconds === 0
    ) {
      clearInterval(dateId);
      startBtn.disabled = false;
    }
  }, 1000);
}

function renderTimer(remainingTime) {
  timerDays.textContent = addLeadingZero(remainingTime.days);
  timerHours.textContent = addLeadingZero(remainingTime.hours);
  timerMinutes.textContent = addLeadingZero(remainingTime.minutes);
  timerSeconds.textContent = addLeadingZero(remainingTime.seconds);
}

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = new Date(selectedDates[0]).getTime();
    const currentDate = new Date().getTime();
    const difference = selectedDate - currentDate;

    if (difference <= 0) {
      alert('Please choose a date in the future.');
      startBtn.disabled = true;
    } else {
      startBtn.disabled = false;
    }
  },
};

flatpickr('#datetime-picker', options);

startBtn.addEventListener('click', countdown);
