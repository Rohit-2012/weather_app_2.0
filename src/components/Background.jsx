import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getWeatherData } from "../features/weatherSlice";
import { Clear, Cloudy, Fog, Rainy, Snowy, Stormy } from "../assets/images";

const Background = () => {
  const [background, setBackground] = useState(Clear);
  const weather = useSelector(getWeatherData);

  useEffect(() => {
    if (weather.conditions) {
      const condition = weather.conditions.toLowerCase();
      const conditionToImage = {
        clear: Clear,
        cloud: Cloudy,
        overcast: Cloudy,
        rain: Rainy,
        fog: Fog,
        snow: Snowy,
        thunder: Stormy,
        storm: Stormy,
      };

      for (const [key, value] of Object.entries(conditionToImage)) {
        if (condition.includes(key)) {
          setBackground(value);
          break;
        }
      }
    }
  }, [weather]);

  return (
    <img
      src={background}
      alt="weather_image"
      className="h-screen w-full fixed left-0 top-0 -z-[10] object-cover"
    />
  );
};

export default Background;
