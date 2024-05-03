import { useEffect, useState } from "react"
import { Static_Clear, Static_Cloudy, Static_Rainy, Static_Snowy, Static_Thunder } from "../assets/images";

const SingleForecast = ({ forecast }) => {
    const [icon, setIcon] = useState(Static_Clear)

    useEffect(() => {
        if (forecast.conditions) {
            const condition = forecast.conditions.toLowerCase();
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
    }, [forecast.conditions])

  return (
    <div className="flex flex-col items-center justify-center min-w-[5rem] px-1">
          <p className="font-light text-sm">{forecast.datetime || forecast.upcomingDays}</p>
          <img src={icon} alt="weather_icon" className="w-12 my-1" />
          <p className="font-medium">{Math.ceil(forecast.temp)}&deg;C</p>
      </div>
  )
}

export default SingleForecast
