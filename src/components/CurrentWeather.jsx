import { Static_Clear, Static_Cloudy, Static_Rainy, Static_Snowy, Static_Thunder } from "../assets/images";
import { useSelector } from "react-redux"
import { getWeatherData } from "../features/weatherSlice"
import {
  FaTemperatureQuarter,
  FaDroplet,
  FaTemperatureArrowUp,
  FaTemperatureArrowDown,
} from "react-icons/fa6";
import { MdWindPower } from "react-icons/md";
import { FiSunrise, FiSunset } from "react-icons/fi";
import { useEffect, useState } from "react";

const CurrentWeather = () => {
  const [icon, setIcon] = useState(Static_Clear)
  const weather = useSelector(getWeatherData)

  const { temp, conditions, feelslike, humidity, sunrise, sunset, tempmax, tempmin, windspeed } = weather
  
  useEffect(() => {
    if (conditions) {
      const condition = weather.conditions.toLowerCase();
      const conditionToImage = {
        clear: Static_Clear,
        cloud: Static_Cloudy,
        overcast: Static_Cloudy,
        rain: Static_Rainy,
        fog: Static_Cloudy,
        snow: Static_Snowy,
        thunder: Static_Thunder,
        storm: Static_Thunder,
      };

      for (const [key, value] of Object.entries(conditionToImage)) {
        if (condition.includes(key)) {
          setIcon(value);
          break;
        }
      }
    }
  }, [weather])
  return (
    <>
      <div className="flex flex-col sm:flex-row items-center justify-center sm:gap-4 sm:justify-around">
        <div className="flex items-center justify-evenly sm:w-1/2">
          <img src={icon} alt="weather_icon" className="w-[8rem]" />
          <h1 className="text-4xl ">{Math.ceil(temp)}&deg;C</h1>
        </div>

        <div className="w-full text-center sm:w-1/2 flex items-center justify-evenly">
          <p className="text-xs sm:text-sm flex items-center gap-1">
            <FaTemperatureQuarter className="sm:text-lg" />
            Feels Like: <span className="font-bold">{Math.ceil(feelslike)}&deg;C</span>
          </p>
          <p className="text-xs sm:text-sm flex items-center gap-1">
            <FaDroplet className="sm:text-lg" />
            Humidity: <span className="font-bold">{Math.ceil(humidity)}%</span>
          </p>
          <p className="text-xs sm:text-sm flex items-center gap-1">
            <MdWindPower className="sm:text-lg" />
            Wind: <span className="font-bold">{Math.ceil(windspeed)} km/h</span>
          </p>
        </div>
      </div>
      <div>
        <h2 className="text-center mt-2 sm:mt-0 text-cyan-300 font-bold text-2xl">
          {conditions}
        </h2>
      </div>

      <div className="flex items-center justify-evenly gap-4 flex-wrap mt-2">
        <div className="flex items-center gap-1">
          <FiSunrise className="text-xs" />
          <p className="text-xs">
            Rise: <span className="font-bold">{sunrise}</span>
          </p>
        </div>
        <div className="flex items-center gap-1">
          <FiSunset className="text-xs" />
          <p className="text-xs">
            Set: <span className="font-bold">{sunset}</span>
          </p>
        </div>
        <div className="flex items-center gap-1">
          <FaTemperatureArrowUp className="text-xs" />
          <p className="text-xs">
            Max: <span className="font-bold">{Math.ceil(tempmax)}&deg;C</span>
          </p>
        </div>
        <div className="flex items-center gap-1">
          <FaTemperatureArrowDown className="text-xs" />
          <p className="text-xs">
            Min: <span className="font-bold">{Math.ceil(tempmin)}&deg;C</span>
          </p>
        </div>
      </div>
    </>
  );
};

export default CurrentWeather;
