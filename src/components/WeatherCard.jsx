
import DateAndTime from "./DateAndTime";
import Searchbar from "./Searchbar";
import CurrentWeather from "./CurrentWeather";
import Forecast from "./Forecast";
import { useSelector } from "react-redux";
import { getError, getWeatherData } from "../features/weatherSlice";
import Unavailable from "./Unavailable";

const WeatherCard = () => {
  const weather = useSelector(getWeatherData)
  const error = useSelector(getError)
  const {address, formattedHourlyData, nextDays} = weather
  
  return (
    <div className="w-full md:w-[768px] h-full glassCard p-4">
      <header className="flex flex-col-reverse sm:flex-row items-center gap-3 justify-center sm:justify-between">
        {address ? <h1 className="text-white text-3xl font-bold capitalize">{address}</h1> : <p className="text-xl font-thin">Search for city in input box</p>}
        <Searchbar />
      </header>

      {/* Date and Time */}
      <DateAndTime />

     {Object.entries(weather).length ? <>
        {/* current weather */}
        <CurrentWeather />
  
        {/* Hourly Forecast */}
        <Forecast title={'Hourly'} forecastArray={formattedHourlyData}/>
  
        {/* Daily Forecast */}
        <Forecast title={'Daily'} forecastArray={nextDays}/>
     </> : error? <Unavailable message={error} /> : <Unavailable />}
    </div>
  );
};

export default WeatherCard;
