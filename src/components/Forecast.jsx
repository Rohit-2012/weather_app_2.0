import SingleForecast from "./SingleForecast"



const Forecast = ({ title, forecastArray }) => {


  return (
    <div className="my-0">
      <h1 className="mt-4 text-left">{title} Forecast</h1>
      <hr className="my-1" />
      <div className="flex items-center gap-6 sm:gap-14 overflow-x-scroll scrollbar scrollbar-thumb-rounded-full scrollbar-thumb-blue-600">
        {forecastArray?.map((forecast, index) => (
          <SingleForecast key={index} forecast={forecast}/>
        ))}
              
          </div>
    </div>
  )
}

export default Forecast
