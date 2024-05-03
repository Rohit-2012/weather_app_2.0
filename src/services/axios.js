import axios from "axios";
import { DateTime } from "luxon";

export const formatToLocalTime = (
  secs,
  zone,
  format = "cccc, dd LLL yyyy' | Local time: 'hh:mm a"
) => DateTime.fromSeconds(secs).setZone(zone).toFormat(format);

export const fetchWeatherData = async (city, unit) => {
  const URL = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=${unit}&include=days%2Chours%2Ccurrent&key=${
    import.meta.env.VITE_API_KEY
  }&contentType=json`;

  try {
    const response = await axios.get(URL);
    const data = response.data;

    const { address, timezone, days } = data;
    const {
      conditions,
      datetimeEpoch,
      description,
      feelslike,
      hours,
      humidity,
      sunriseEpoch,
      sunsetEpoch,
      temp,
      tempmax,
      tempmin,
      windspeed,
    } = days[0];

    const dateToday = formatToLocalTime(
      datetimeEpoch,
      timezone,
      "cccc, dd LLL yyyy"
    );
    const sunrise = formatToLocalTime(sunriseEpoch, timezone, "hh:mm a");
    const sunset = formatToLocalTime(sunsetEpoch, timezone, "hh:mm a");

    // Formatted data for next 6 days
    const nextDays = days.slice(1, 8).map((day) => {
      return {
        conditions: day.conditions,
        upcomingDays: formatToLocalTime(day.datetimeEpoch, timezone, "ccc"),
        temp: day.temp,
      };
    });

    // Formatted hourly data of 24 hours
    const formattedHourlyData = hours.map((hour) => {
      return {
        conditions: hour.conditions,
        datetime: formatToLocalTime(hour.datetimeEpoch, timezone, "hh:mm a"),
        temp: hour.temp,
      };
    });

    const weatherData = {
      address,
      timezone,
      nextDays,
      conditions,
      dateToday,
      datetimeEpoch,
      description,
      feelslike,
      formattedHourlyData,
      humidity,
      sunrise,
      sunset,
      temp,
      tempmax,
      tempmin,
      windspeed,
    };

    return weatherData;
  } catch (error) {
    throw {
      status: error.response?.status || 500,
      message: error.response?.data || 'An unknown error occurred'
    };
  }
};



export const fetchCurrentLocation = async (lat, lon) => {
  const URL = `https://geocode.maps.co/reverse?lat=${lat}&lon=${lon}&api_key=${import.meta.env.VITE_GEOCODING_API_KEY}`

  try {
    const response = await axios.get(URL);
    const data = response.data;
    const {address: {county}} = data
    
    return county
  } catch (error) {
    console.error("Error fetching current location:", error);
    throw {message: error.response?.data}
  }
}