function getTomorrowDate() {
  const today = new Date(); // Get the current date

  // Increment the date by one day
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  return tomorrow;
}

function formatDate(date, format = "mm-dd-yy") {
  const map = {
    mm: date.getMonth() + 1,
    dd: date.getDate(),
    yy: date.getFullYear().toString().slice(-2),
    yyyy: date.getFullYear(),
  };

  return format.replace(/mm|dd|yy|yyy/gi, (matched) => map[matched]);
}

function formatTime(date, format = "hh:mm") {
  // decrease 5:30 hrs from date
  date.setHours(date.getHours() - 5);
  date.setMinutes(date.getMinutes() - 30);
  const map = {
    hh: date.getHours(),
    mm: date.getMinutes(),
  };

  return format.replace(/hh|mm/gi, (matched) => map[matched]);
}

const convertTimeTo12Hour = (time) => {
  let [hours, minutes] = time.split(":");
  let meridian = "AM";
  if (Number(hours) > 12) {
    hours -= 12;
    meridian = "PM";
  }
  if (hours < 10) hours = `0${hours}`;
  if (minutes < 10) minutes = `0${minutes}`;
  return `${hours}:${minutes} ${meridian}`;
};

export { getTomorrowDate, formatDate, formatTime, convertTimeTo12Hour };
