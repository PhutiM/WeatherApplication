export const RectColor = (type) => {
  let rectColor;
  if (type === 'Clear') {
    rectColor = '#4a90e2';
  } else if (type === 'Clouds') {
    rectColor = '#628594';
  } else if (type === 'Rain') {
    rectColor = '#686868';
  }
  return rectColor;
};

export const GetBackgroundByWeather = (type) => {
  console.log(type);
  let bg;
  if (type === 'Clear') {
    bg = require('../../assets/images/sea_sunnypng.png');
  } else if (type === 'Clouds') {
    bg = require('../../assets/images/sea_cloudy.png');
  } else if (type === 'Rain') {
    bg = require('../../assets/images/sea_rainy.png');
  }
  return bg;
};

export const GetWeatherIcon = (type) => {
  console.log(type)
  let bg;
  if (type === 'Clear') {
    bg = require('../../assets/Icons/clear.png');
  } else if (type === 'Clouds') {
    bg = require('../../assets/Icons/partlysunny.png');
  } else if (type === 'Rain') {
    bg = require('../../assets/Icons/rain.png');
  }
  return bg;
};

export const DayOfWeek = (datetime, val=true) => {
  let day
  if (val) {
    const [date, time] = datetime.split(' ');
    day = new Date(date)
  } else {
    day = datetime
  }
  const weekday = new Array(7);
  weekday[0] = 'Sunday';
  weekday[1] = 'Monday';
  weekday[2] = 'Tuesday';
  weekday[3] = 'Wednesday';
  weekday[4] = 'Thursday';
  weekday[5] = 'Friday';
  weekday[6] = 'Saturday';

  const dayOfWeek = weekday[day.getDay()];
  return dayOfWeek;
};

export const BuildLastUpdated = (forcasts) => {
  let i;
  const list = [];
  const today = new Date();
  for (i = 1; i < forcasts.length; i++) {
    if (list.length === 0) {
      forcasts.map((forecast) => {
        if (list.length === 0 && DayOfWeek(forecast.dt_txt) !== DayOfWeek(today, false)) {
             return list.push(forecast)
        }
      })
    }
    const [date, time] = forcasts[i].dt_txt.split(' ');
    if (!list[list.length - 1].dt_txt.includes(date) && DayOfWeek(forcasts[i].dt_txt) !== DayOfWeek(today, false)) {
      list.push(forcasts[i]);
    }
  }
  return list;
};
