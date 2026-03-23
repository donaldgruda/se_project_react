import { coordinates, apiKey } from "./constants";

function getWeatherData() {
  return fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${coordinates.latitude}&lon=${coordinates.longitude}&units=imperial&appid=${apiKey}`,
  ).then((res) => {
    if (!res.ok) {
      return Promise.reject(`Error: ${res.status}`);
    }
    return res.json();
  });
}

function parseWeatherData(data) {
  const tempF = Math.round(data.main.temp);
  const tempC = Math.round((tempF - 32) * (5 / 9));

  return {
    temperature: {
      F: tempF,
      C: tempC,
    },
    city: data.name,
  };
}

function getWeatherCondition(temp) {
  if (temp >= 86) {
    return "hot";
  } else if (temp >= 66) {
    return "warm";
  } else {
    return "cold";
  }
}

export { getWeatherData, parseWeatherData, getWeatherCondition };
